# must be in root folder
npm run build
cd dist
git init
git add -A
git commit -m "Deploy"
git branch -M main
git push -f git@github.com:mustikkakissa/jm-portfolio.git main:gh-pages
cd ..