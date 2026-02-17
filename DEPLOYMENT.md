# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `moodful-loaders` (or any name you prefer)
5. Make it **Public** (required for free Vercel deployment)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/sandeepmajumder/Documents/Curor works/Design your wait"
git remote add origin https://github.com/YOUR_USERNAME/moodful-loaders.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Via Vercel Website (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub to sign in)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`moodful-loaders`)
4. Vercel will auto-detect it's a static site
5. Click "Deploy"
6. Your site will be live in seconds!

### Option B: Via Vercel CLI

```bash
npm i -g vercel
cd "/Users/sandeepmajumder/Documents/Curor works/Design your wait"
vercel
```

Follow the prompts to deploy.

## Your Live URL

After deployment, Vercel will provide you with a URL like:
`https://moodful-loaders.vercel.app`

You can also set a custom domain in Vercel settings.

