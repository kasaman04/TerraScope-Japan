import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  service: z.string().optional(),
  msg:     z.string().max(1000).optional(),
});

interface Env {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_WRITE_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env) {
    // CORS headers for preflight requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { 
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const data = Object.fromEntries(await request.formData());
      const parsed = schema.safeParse(data);
      
      if (!parsed.success) {
        return new Response("Bad Request", { 
          status: 400,
          headers: corsHeaders,
        });
      }

      // Sanity Mutation
      const sanityResponse = await fetch(
        `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${env.SANITY_DATASET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [
              { 
                create: { 
                  _type: "lead", 
                  ...parsed.data, 
                  createdAt: new Date().toISOString() 
                } 
              },
            ],
          }),
        }
      );

      if (!sanityResponse.ok) {
        console.error("Sanity mutation failed:", await sanityResponse.text());
        return new Response("Internal Server Error", { 
          status: 500,
          headers: corsHeaders,
        });
      }

      // 303 Redirect to thank you page
      return Response.redirect("https://land-vista.github.io/contact/thank-you", 303);
    } catch (error) {
      console.error("Error processing form:", error);
      return new Response("Internal Server Error", { 
        status: 500,
        headers: corsHeaders,
      });
    }
  },
} satisfies ExportedHandler<Env>;