# LAND VISTA Global

A comprehensive multilingual platform for foreign investors interested in Japanese land investment. Features professional due diligence services, 360° VR property tours, and comprehensive risk assessments.

## 🌟 Features

- **5 Languages**: English, Japanese, Chinese (Simplified/Traditional), Korean
- **Sanity CMS**: Headless content management with fallback data
- **Cloudflare Worker**: Serverless contact form handling
- **GA4 + Cookie Consent**: GDPR-compliant analytics
- **SEO Optimized**: Sitemap, structured data, canonical URLs, hreflang
- **Performance**: Lighthouse scores ≥90 across all metrics
- **CI/CD**: Automated deployment via GitHub Actions

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/<USER>/<REPO>.git
cd land-vista
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```ini
# Google Analytics 4
PUBLIC_GA_ID=G-XXXXXXXXXX

# Sanity CMS (optional - fallback data available)
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-07-15

# CRM Integration (optional)
SENDGRID_API_KEY=SG.xxxxx
HUBSPOT_PORTAL_ID=123456
HUBSPOT_FORM_ID=abcdef
```

### 3. Development
```bash
npm run dev
# Opens http://localhost:4321
```

### 4. Build & Preview
```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Astro with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity (headless)
- **Forms**: Cloudflare Workers
- **Deployment**: GitHub Pages
- **Analytics**: Google Analytics 4

### Project Structure
```
src/
├── components/       # Reusable UI components
├── layouts/         # Page layouts
├── pages/           # Route pages
│   ├── ja/         # Japanese pages
│   ├── services/   # Service pages
│   ├── blog/       # Blog posts
│   └── legal/      # Legal pages
├── locales/        # i18n translations
├── utils/          # Utilities (i18n, etc.)
└── assets/         # Static assets
```

## 🌍 Multilingual Setup

The site supports 5 languages with automatic browser detection:

- **English**: `/` (default)
- **Japanese**: `/ja/`
- **Chinese (Simplified)**: `/zh/`
- **Chinese (Traditional)**: `/zh-TW/`
- **Korean**: `/ko/`

Translation files are located in `src/locales/[lang]/common.json`.

## 📝 Content Management

### Sanity CMS Integration
1. Set up Sanity project at [sanity.io](https://sanity.io)
2. Configure schemas in `/studio/schemas/`
3. Add environment variables
4. Content automatically syncs with fallback data

### Adding Blog Posts
Create files in `src/content/blog/` with frontmatter:
```markdown
---
title: "Your Post Title"
description: "Post description"
publishDate: "2025-01-15"
author: "Author Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🚀 Deployment

### GitHub Pages (Automated)
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at `https://<username>.github.io/<repo>`

### Manual Deployment
```bash
npm run build
# Deploy /dist folder to your hosting provider
```

## 🔧 Configuration

### Astro Config
Key settings in `astro.config.mjs`:
```js
export default defineConfig({
  base: "/land-vista",
  site: "https://yourusername.github.io/land-vista",
  integrations: [tailwind(), sitemap()]
});
```

### GitHub Actions
Workflows in `.github/workflows/`:
- `deploy.yml`: Main deployment on push
- `dispatch-deploy.yml`: Webhook-triggered rebuilds

## 📊 Analytics & SEO

### Google Analytics 4
- Cookie consent banner (GDPR compliant)
- Opt-in analytics activation
- IP anonymization enabled

### SEO Features
- Automatic sitemap generation
- Canonical URLs
- hreflang tags for multilingual SEO
- Structured data (JSON-LD)
- Open Graph meta tags

## 🔗 Integrations

### Cloudflare Worker (Contact Form)
Located in `/land-vista-form/`:
```bash
cd land-vista-form
npm install
wrangler deploy
```

### Sanity Webhook
Automatically rebuilds site when content is published:
1. Create GitHub Personal Access Token
2. Configure webhook in Sanity Studio
3. Test by publishing content

## 📱 Services

### Light Survey (¥45,000)
- Basic zoning check
- Legal compliance review
- 3-business-day delivery

### Full Risk Report (¥120,000)
- Comprehensive due diligence
- On-site inspection
- 18-page professional report
- 7-business-day delivery

### 360° VR Capture (¥80,000)
- Professional drone footage
- Interactive virtual tours
- 4K quality capture

## 🛠️ Development

### Adding New Languages
1. Create `/src/locales/[lang]/common.json`
2. Add language to `src/utils/i18n.ts`
3. Create page directory `/src/pages/[lang]/`
4. Update language switcher in header

### Performance Optimization
- Images optimized with `astro:assets`
- Lazy loading for non-critical resources
- requestIdleCallback for JavaScript
- Aspect ratios to prevent CLS

### Testing
```bash
# Lighthouse CI (requires Chrome)
npx lhci autorun --collect.staticDistDir=dist

# Build test
npm run build

# Type checking
npm run astro check
```

## 🔐 Security

- Environment variables for sensitive data
- CORS headers configured
- SameSite cookie flags
- Input validation with Zod
- No secrets in client-side code

## 📄 Legal Compliance

- Cookie consent banner
- Privacy policy (`/legal/privacy`)
- Terms of service (`/legal/disclaimer`)
- Cookie policy (`/legal/cookies`)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

For technical support or feature requests:
- GitHub Issues: [Create Issue](https://github.com/<USER>/<REPO>/issues)
- Email: support@landvista.global

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for Japanese land investment opportunities

🤖 Generated with [Claude Code](https://claude.ai/code)