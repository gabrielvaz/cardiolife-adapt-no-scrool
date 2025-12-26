#!/bin/bash
echo "Starting deployment diagnostics..." > deploy.log

echo "--- Git Status ---" >> deploy.log
git status >> deploy.log 2>&1

echo "--- Git Commit ---" >> deploy.log
git add . >> deploy.log 2>&1
git commit -m "Deepmind: Deployment commit" >> deploy.log 2>&1

echo "--- Git Remote ---" >> deploy.log
git remote -v >> deploy.log 2>&1

echo "--- GH Repo Create / Push ---" >> deploy.log
# Try to create repo. If it fails (e.g. already exists), try to push.
gh repo create cardiolife-adapt-no-scrool --public --source=. --remote=origin --push >> deploy.log 2>&1 || git push -u origin main >> deploy.log 2>&1

echo "--- Vercel Deploy ---" >> deploy.log
# Use --yes to skip confirmation, --prod for production deployment
npx vercel --prod --yes >> deploy.log 2>&1

echo "Diagnostics complete." >> deploy.log
