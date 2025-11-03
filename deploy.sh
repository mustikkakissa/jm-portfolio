echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Navigate to the build output directory
cd dist

echo "📝 Initializing git in dist folder..."
git init

echo "➕ Adding files..."
git add -A

echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# Get the repository URL
REPO_URL=$(echo "git@github.com:mustikkakissa/jm-portfolio.git")

# Build the push command
PUSH_CMD="git push -f $REPO_URL main:gh-pages"

echo ""
echo "📋 Next step:"
echo "$PUSH_CMD"
echo ""

# Try to copy to clipboard
if command -v clip.exe &> /dev/null; then
    # Windows (Git Bash)
    echo "$PUSH_CMD" | clip.exe
    echo "✅ Command copied to clipboard!"
elif command -v pbcopy &> /dev/null; then
    # macOS
    echo "$PUSH_CMD" | pbcopy
    echo "✅ Command copied to clipboard!"
elif command -v xclip &> /dev/null; then
    # Linux with xclip
    echo "$PUSH_CMD" | xclip -selection clipboard
    echo "✅ Command copied to clipboard!"
else
    echo "💡 Copy the command above and run it manually"
fi

echo ""
