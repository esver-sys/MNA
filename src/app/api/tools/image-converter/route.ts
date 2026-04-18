import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  try {
    const { directory } = await req.json();

    if (!directory) {
      return NextResponse.json({ error: 'Directory path is required' }, { status: 400 });
    }

    // Verify directory exists
    try {
        const stats = await fs.stat(directory);
        if (!stats.isDirectory()) {
             return NextResponse.json({ error: 'Path is not a directory' }, { status: 400 });
        }
    } catch (e) {
         return NextResponse.json({ error: 'Directory not found or not accessible' }, { status: 404 });
    }

    const files = await fs.readdir(directory);
    const results = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      
      try {
          // Skip directories
          const stats = await fs.stat(filePath);
          if (stats.isDirectory()) continue;

          // Attempt to identify image
          let metadata;
          try {
             // failOnError: false allows processing corrupted/truncated images (e.g. bad seek)
             metadata = await sharp(filePath, { failOnError: false }).metadata();
          } catch (e) {
             // Not an image or sharp can't read it
             results.push({ file, status: 'skipped', reason: 'Not a valid image or unsupported by sharp' });
             continue;
          }
          
          const format = metadata.format;
          const ext = path.extname(file).toLowerCase();
          
          // Logic:
          // Supported formats by system: jpg, jpeg, png, gif
          // Problematic: 
          // 1. Format is NOT supported (e.g. webp, tiff) -> Convert to PNG
          // 2. Format IS supported, but extension is .png and format is NOT png (Fake PNG) -> Convert to PNG (to fix it)
          
          const isSupportedFormat = ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(format || '');
          const isFakePng = ext === '.png' && format !== 'png';
          
          if (!isSupportedFormat || isFakePng) {
              // Convert to PNG
              const newFileName = path.basename(file, path.extname(file)) + '_converted.png';
              const newFilePath = path.join(directory, newFileName);
              
              // Read and convert
              // failOnError: false is crucial for handling "bad seek" errors in truncated files
              const buffer = await sharp(filePath, { failOnError: false }).png().toBuffer();
              
              // Write new file (or overwrite)
              await fs.writeFile(newFilePath, buffer);
              
              results.push({ file, status: 'converted', to: newFileName, originalFormat: format });
          } else {
              results.push({ file, status: 'ok', format });
          }
          
      } catch (err: any) {
          let errorMessage = err.message;
          if (errorMessage.includes('heif')) {
              errorMessage = 'HEIF/HEIC 格式不支持或文件损坏 (sharp heif error)';
          } else if (errorMessage.includes('bad seek')) {
              errorMessage = '文件数据截断或损坏 (bad seek)';
          }
          results.push({ file, status: 'error', error: errorMessage });
      }
    }

    return NextResponse.json({ message: 'Processing complete', results });

  } catch (error: any) {
    console.error('Conversion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
