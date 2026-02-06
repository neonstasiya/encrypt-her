

## Goal
Deploy your site to GitHub Pages directly from the `encrypther` repo, so every push to `master` automatically builds and publishes your React/Vite app to `encrypther.org`.

## Why This Is Needed
Your app is a React/Vite project that requires a build step (`npm run build`) to produce static files. GitHub Pages can only serve static files, so you need a GitHub Actions workflow to handle the build automatically.

## What Changes

### 1. Add a GitHub Actions deploy workflow
Create `.github/workflows/deploy.yml` that:
- Triggers on every push to `master`
- Installs dependencies, builds the app (`npm run build`)
- Deploys the `dist/` folder to GitHub Pages

### 2. Update Vite config for custom domain
Add a `base: "/"` setting to `vite.config.ts` to ensure assets load correctly on your custom domain.

### 3. Add CNAME file for custom domain
Create `public/CNAME` containing `encrypther.org` so GitHub Pages serves on your custom domain.

## What You'll Need to Do After
1. **In the GitHub repo** (`encrypther` repo Settings --> Pages): set the source to **"GitHub Actions"** (not "Deploy from a branch")
2. **Add environment variables as GitHub secrets** (repo Settings --> Secrets and variables --> Actions):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. **Verify DNS**: your domain registrar should have an A record pointing `encrypther.org` to GitHub's IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) -- this may already be set up from before
4. You do NOT need to use Lovable's Publish button -- everything deploys through GitHub

## Technical Details

The deploy workflow file (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The `public/CNAME` file ensures GitHub Pages uses your custom domain. The Vite config update ensures correct asset paths.

## Summary
- Lovable stays connected to GitHub for code sync (every edit pushes to `master`)
- GitHub Actions automatically builds and deploys to GitHub Pages on each push
- `encrypther.org` serves your site via GitHub Pages
- No need to use Lovable's Publish button

