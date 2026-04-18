import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    let currentPath = searchParams.get('path');

    // If no path provided, try to list root drives (Windows) or root (Linux/Mac)
    if (!currentPath) {
        if (os.platform() === 'win32') {
            // Very basic drive listing for Windows
            // This is a heuristic/hack since node doesn't have a direct "list drives" API without execution
            // We can try to list A-Z
            const drives = [];
            for (let i = 65; i <= 90; i++) {
                const driveLetter = String.fromCharCode(i);
                const drivePath = `${driveLetter}:\\`;
                try {
                    await fs.access(drivePath);
                    drives.push({
                        name: drivePath,
                        path: drivePath,
                        isDirectory: true
                    });
                } catch (e) {
                    // Drive doesn't exist or not accessible
                }
            }
             return NextResponse.json({ 
                currentPath: '', 
                items: drives,
                isRoot: true 
            });
        } else {
            currentPath = '/';
        }
    }

    // List contents of the path
    try {
        const stats = await fs.stat(currentPath);
        if (!stats.isDirectory()) {
             return NextResponse.json({ error: 'Not a directory' }, { status: 400 });
        }
    } catch (e) {
         return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    
    const items = entries
        .filter(entry => entry.isDirectory())
        .map(entry => ({
            name: entry.name,
            path: path.join(currentPath!, entry.name),
            isDirectory: true
        }));

    // Add ".." option if not at root (conceptually)
    // Actually, client can handle "parent" navigation by just stripping the last segment.
    
    return NextResponse.json({ 
        currentPath, 
        items,
        isRoot: false 
    });

  } catch (error: any) {
    console.error('List directory error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
