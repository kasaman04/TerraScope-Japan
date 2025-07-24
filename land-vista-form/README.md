# Land Vista Form Handler

Cloudflare Worker for handling contact form submissions and storing leads in Sanity CMS.

## Setup Instructions

### 1. Sanity Configuration

Update the following values in `wrangler.toml`:

```toml
[vars]
SANITY_PROJECT_ID = "your-actual-project-id"
SANITY_DATASET = "production"
SANITY_WRITE_TOKEN = "your-write-token"
```

### 2. Sanity Write Token

1. Go to Sanity Studio → Settings → API
2. Create a new token with:
   - **Name**: `Land Vista Form Handler`
   - **Permissions**: `Editor` (or custom with write access to `lead` documents)
3. Copy the token and add it to `wrangler.toml`

### 3. Deployment

```bash
# Login to Cloudflare
npx wrangler login

# Deploy the worker
npx wrangler deploy
```

### 4. Update Frontend

After deployment, update the worker URL in:
- `land-vista/src/components/ContactForm.astro`
- Change `workerUrl` to your deployed worker URL

## Features

- ✅ Form validation with Zod
- ✅ CORS support for cross-origin requests
- ✅ Sanity CMS integration
- ✅ Automatic redirect to thank you page
- ✅ Error handling and logging

## Testing

```bash
# Test with curl
curl -X POST https://your-worker-url.workers.dev \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "service=full" \
  -d "msg=Test message"
```

## Security

- Uses Sanity write token for secure mutations
- Input validation prevents malicious data
- CORS headers configured for specific domains
- Rate limiting can be added via Cloudflare dashboard