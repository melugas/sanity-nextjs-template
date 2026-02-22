# Sanity Setup Guide

## Quick Start

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```bash
# Sanity Project Configuration
SANITY_STUDIO_PROJECT_ID=7jt5906a
SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=7jt5906a
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (get from https://www.sanity.io/manage)
# Required for draft mode and private datasets
SANITY_API_READ_TOKEN=your-token-here

# Studio Preview URL
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
```

**To get your API token:**
1. Go to https://www.sanity.io/manage
2. Select your project "MU Digital Site"
3. Go to API → Tokens
4. Create a new token with "Read" permissions

### 2. Deploy Schema

Deploy your schema to Sanity so you can use MCP tools:

```bash
cd studio
npx sanity schema deploy
```

### 3. Start Development Servers

From the root directory:

```bash
npm run dev
```

This starts:
- **Studio** at http://localhost:3333
- **Next.js app** at http://localhost:3000

### 4. Create Your First Content

1. Open http://localhost:3333
2. Sign in to Sanity Studio
3. Click "+ Create" → Select "Post"
4. Fill in the fields and publish

Your content will appear at http://localhost:3000

## What's Included

- ✅ **Schema Types**: Post, Page, Person, Settings
- ✅ **Visual Editing**: Click-to-edit in Presentation Tool
- ✅ **Live Content API**: Real-time updates
- ✅ **Page Builder**: Drag-and-drop page creation

## Next Steps

- Add more schema types
- Customize the Studio structure
- Set up Visual Editing
- Deploy to production

