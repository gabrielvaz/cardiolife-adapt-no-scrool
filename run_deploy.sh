#!/bin/bash
echo "Starting deployment..."
git add .
git commit -m "Final Refactor"
gh repo create cardiolife-adapt-no-scrool --public --source=. --remote=origin --push || git push -u origin main
npx vercel --prod --yes
echo "Done."
