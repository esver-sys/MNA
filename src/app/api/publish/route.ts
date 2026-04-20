import { NextRequest, NextResponse } from 'next/server';

// 配置常量 - 现在只在服务端使用
const CONFIG = {
  API_KEY: process.env.API_KEY || '2f791c32-9810-4de7-b8a7-5e98a000b2fa',
  SECRET: process.env.SECRET || '342878a9-b7bf-4b4c-a943-f07e8d84f707',
  ENV_URLS: {
    sandbox: 'https://spa-shop-sandbox.eshoptechhub.com/spa-open-api',
    sandbox2: 'https://spa-shop-sandbox2.eshoptechhub.com/spa-open-api',
    sandbox3: 'https://spa-shop-sandbox3.eshoptechhub.com/spa-open-api',
    sandbox4: 'https://spa-shop-sandbox4.eshoptechhub.com/spa-open-api',
  }
};

export async function POST(request: NextRequest) {
  try {
    // 添加调试日志
    console.log('API Route: Starting publish request');
    
    const { env, formData, publishType = 'publish' } = await request.json();
    
    if (!env || !formData) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数' },
        { status: 400 }
      );
    }

    const baseUrl = CONFIG.ENV_URLS[env as keyof typeof CONFIG.ENV_URLS];
    
    if (!baseUrl) {
      return NextResponse.json(
        { success: false, message: '无效的环境' },
        { status: 400 }
      );
    }

    if (!formData.template) {
      return NextResponse.json(
        { success: false, message: 'Template 不能为空' },
        { status: 400 }
      );
    }

    if (publishType === 'publish' && !formData.version) {
      return NextResponse.json(
        { success: false, message: 'Version 不能为空' },
        { status: 400 }
      );
    }

    const isOpenTemplate = publishType === 'open-template';
    const signBody = isOpenTemplate ? {} : formData;
    const requestUrl = isOpenTemplate
      ? `${baseUrl}/templates/${encodeURIComponent(formData.template)}/display-strategy/all-stores`
      : `${baseUrl}/versions/publish`;
    const requestBody = isOpenTemplate ? {} : formData;

    // 1. 生成签名
    console.log(`API Route: Requesting signature from ${baseUrl}/auth/generate-signature`);
    const signRes = await fetch(`${baseUrl}/auth/generate-signature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: CONFIG.SECRET,
        body: signBody
      })
    });
    
    const signData = await signRes.json();
    console.log('API Route: Signature response:', signData);
    
    if (!signData.success) {
      return NextResponse.json(
        { success: false, message: signData.message || '签名生成失败' },
        { status: 500 }
      );
    }
    console.log('API Route: Successfully generated signature:', signData.data);
    
    
    const { timestamp, signature } = signData.data;

    // 2. 执行发布 / 开放模板
    const publishRes = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONFIG.API_KEY,
        'x-signature': signature,
        'x-timestamp': timestamp.toString()
      },
      body: JSON.stringify(requestBody)
    });

    const publishData = await publishRes.json();
    console.log('API Route: Publish response:', publishData);
    
    if (!publishData.success) {
      return NextResponse.json(
        { success: false, message: publishData.message || '发布接口返回错误' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: publishData.data || {
        template: formData.template,
        version: formData.version,
        status: isOpenTemplate ? 'all-stores-enabled' : 'success'
      },
      message: publishData.message || (isOpenTemplate ? '开放模板成功' : '发布成功')
    });
    
  } catch (error: any) {
    console.error('Publish API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || '服务器内部错误' },
      { status: 500 }
    );
  }
}
