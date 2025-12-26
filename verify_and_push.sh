#!/bin/bash
LOGfile="sync_log.txt"
echo "--- Starting Sync ---" > $LOGfile
date >> $LOGfile

echo "--- Auth Status ---" >> $LOGfile
gh auth status >> $LOGfile 2>&1

echo "--- Git Remote ---" >> $LOGfile
git remote -v >> $LOGfile 2>&1

echo "--- Repo View ---" >> $LOGfile
gh repo view gabrielvaz/cardiolife-adapt-no-scrool >> $LOGfile 2>&1

echo "--- Push Attempt ---" >> $LOGfile
git push origin main --force >> $LOGfile 2>&1

echo "--- Done ---" >> $LOGfile
