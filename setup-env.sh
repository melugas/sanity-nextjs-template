#!/bin/bash
# Quick setup script for Sanity environment variables

ENV_FILE=".env.local"

if [ -f "$ENV_FILE" ]; then
  echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
  cp "$ENV_FILE" "$ENV_FILE.backup"
fi

cat > "$ENV_FILE" << 'ENVEOF'
# Sanity Project Configuration
# Project: MU Digital Site (7jt5906a)
SANITY_STUDIO_PROJECT_ID=7jt5906a
SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=7jt5906a
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Token (required for draft mode and private datasets)
# Get your token from: https://www.sanity.io/manage
# SANITY_API_READ_TOKEN=your-token-here

# Studio Preview URL
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000
ENVEOF

echo "✅ Created .env.local file"
echo ""
echo "⚠️  IMPORTANT: Add your SANITY_API_READ_TOKEN"
echo "   1. Visit https://www.sanity.io/manage"
echo "   2. Select project 'MU Digital Site'"
echo "   3. Go to API → Tokens → Create token (Read permissions)"
echo "   4. Add it to .env.local"
