import type { APIRoute } from "astro";

const schema = {
  service: (value: string) => value,
  name: (value: string) => {
    if (typeof value !== 'string' || value.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    return value;
  },
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
    return value;
  },
  msg: (value: string) => {
    if (value && value.length > 1000) {
      throw new Error('Message too long');
    }
    return value || '';
  },
};

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    let data: Record<string, any>;
    
    // Content-Typeに応じてデータを解析
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      // URLエンコードされたフォームデータを解析
      const body = await request.text();
      data = Object.fromEntries(new URLSearchParams(body));
    } else if (contentType.includes('multipart/form-data')) {
      // マルチパートフォームデータを解析
      const formData = await request.formData();
      data = Object.fromEntries(formData);
    } else {
      // デフォルトの場合はformDataとして扱う
      try {
        const formData = await request.formData();
        data = Object.fromEntries(formData);
      } catch {
        // formDataが失敗した場合はJSONとして試行
        const body = await request.text();
        if (body) {
          data = JSON.parse(body);
        } else {
          data = {};
        }
      }
    }
    
    console.log('Received form data:', data);
    
    // バリデーション
    const parsed = {
      service: schema.service(data.service as string || ''),
      name: schema.name(data.name as string),
      email: schema.email(data.email as string),
      msg: schema.msg(data.msg as string),
    };

    // 開発環境では console.log でダミー出力
    console.log('=== Contact Form Submission ===');
    console.log('Service:', parsed.service);
    console.log('Name:', parsed.name);
    console.log('Email:', parsed.email);
    console.log('Message:', parsed.msg);
    console.log('==============================');

    // CRM連携処理
    const crmResults = await Promise.allSettled([
      // 1. Webhook URL への送信（テスト用・汎用）
      sendToWebhook(parsed),
      
      // 2. HubSpot API 連携
      sendToHubSpot(parsed, request.url),
      
      // 3. Airtable API 連携
      sendToAirtable(parsed),
      
      // 4. SendGrid 通知メール
      sendNotificationEmail(parsed)
    ]);

    // CRM連携結果をログ出力
    crmResults.forEach((result, index) => {
      const crmNames = ['Webhook', 'HubSpot', 'Airtable', 'SendGrid'];
      if (result.status === 'fulfilled') {
        console.log(`✓ ${crmNames[index]} integration successful`);
      } else {
        console.log(`✗ ${crmNames[index]} integration failed:`, result.reason);
      }
    });

    // 完了ページへリダイレクト
    return redirect("/contact/thank-you", 303);
    
  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    // エラーページまたはエラーメッセージを返す
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit form. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Webhook URL への送信（汎用・テスト用）
async function sendToWebhook(data: any) {
  const webhookUrl = import.meta.env.WEBHOOK_URL || process.env.WEBHOOK_URL;
  console.log('Webhook URL configured:', webhookUrl ? 'Yes' : 'No');
  
  if (!webhookUrl) return Promise.resolve('No webhook URL configured');
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'land-vista-contact-form'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }
    
    return response.text();
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}

// HubSpot API 連携
async function sendToHubSpot(data: any, pageUrl: string) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;
  
  if (!portalId || !formId) {
    return Promise.resolve('HubSpot not configured');
  }
  
  const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [
        { name: "email", value: data.email },
        { name: "firstname", value: data.name },
        { name: "message", value: data.msg },
        { name: "service", value: data.service },
      ],
      context: { 
        pageUri: pageUrl, 
        pageName: "Contact Form - LAND VISTA" 
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error(`HubSpot API failed: ${response.status}`);
  }
  
  return response.text();
}

// Airtable API 連携
async function sendToAirtable(data: any) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Contacts';
  
  if (!apiKey || !baseId) {
    return Promise.resolve('Airtable not configured');
  }
  
  const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      records: [{
        fields: {
          'Name': data.name,
          'Email': data.email,
          'Service': data.service,
          'Message': data.msg,
          'Submitted': new Date().toISOString(),
          'Source': 'Website Contact Form'
        }
      }]
    })
  });
  
  if (!response.ok) {
    throw new Error(`Airtable API failed: ${response.status}`);
  }
  
  return response.json();
}

// SendGrid 通知メール
async function sendNotificationEmail(data: any) {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey || !apiKey.startsWith('SG.')) {
    return Promise.resolve('SendGrid not configured');
  }
  
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ 
        to: [{ email: "info@land-vista.com" }] // 実際のメールアドレスに変更
      }],
      from: { 
        email: "noreply@land-vista.com", // 実際の送信元アドレスに変更
        name: "LAND VISTA Contact Form"
      },
      subject: `New Contact Form Submission - ${data.service || 'General Inquiry'}`,
      content: [{
        type: "text/html",
        value: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Service:</strong> ${data.service || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.msg || 'No message provided'}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        `
      }],
    }),
  });
  
  if (!response.ok) {
    throw new Error(`SendGrid API failed: ${response.status}`);
  }
  
  return response.text();
}