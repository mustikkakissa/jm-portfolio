# Portfolio

A React portfolio website deployed to GitHub Pages.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Manual Deployment to GitHub Pages

### Initial Setup

1. Create a GitHub Repository
   - Repository name: jm-portfolio (must match base in vite.config.js)
   - Visibility: Public (required for free GitHub Pages)
   - Do not initialize with README

2. Push your source code to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/mustikkakissa/jm-portfolio.git
   git push -u origin main
   ```

3. Build the project
   ```bash
   npm run build
   ```

4. Deploy the built files to gh-pages branch
   ```bash
   cd dist
   git init
   git add -A
   git commit -m "Deploy"
   git push -f https://github.com/mustikkakissa/jm-portfolio.git main:gh-pages
   cd ..
   ```

5. Enable GitHub Pages
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
   - Click Save

6. View your site at: https://mustikkakissa.github.io/jm-portfolio/

### Updating the Site

To deploy changes:

```bash
# Save source code changes
git add .
git commit -m "Update site"
git push

# Build and deploy
npm run build
cd dist
git init
git add -A
git commit -m "Deploy"
git push -f https://github.com/mustikkakissa/jm-portfolio.git main:gh-pages
cd ..
```

## Configuration

- Base URL is set to /jm-portfolio/ in vite.config.js (must match repository name)
- The main branch contains source code
- The gh-pages branch contains built files for deployment

## Built With

- React 19
- Vite 7

