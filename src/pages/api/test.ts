import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({
      status: 'API is working',
      timestamp: new Date().toISOString(),
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      env: {
        webhook_url: import.meta.env.WEBHOOK_URL || 'Not configured',
        node_env: process.env.NODE_ENV || 'Not set'
      }
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    console.log('Raw body:', body);
    
    return new Response(
      JSON.stringify({
        status: 'POST received',
        body: body,
        contentType: request.headers.get('content-type'),
        length: body.length
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};