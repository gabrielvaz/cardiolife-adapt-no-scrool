#!/bin/bash
TARGET_FILE="diagnostics_output.txt"
echo "--- DATE ---" > $TARGET_FILE
date >> $TARGET_FILE

echo -e "\n--- GIT BRANCH ---" >> $TARGET_FILE
git branch -a -vv >> $TARGET_FILE 2>&1

echo -e "\n--- GIT REMOTE ---" >> $TARGET_FILE
git remote -v >> $TARGET_FILE 2>&1

echo -e "\n--- GIT LOG ---" >> $TARGET_FILE
git log -1 >> $TARGET_FILE 2>&1

echo -e "\n--- GIT STATUS ---" >> $TARGET_FILE
git status >> $TARGET_FILE 2>&1

echo -e "\n--- PUSH DRY RUN ---" >> $TARGET_FILE
# Dry run to see what WOULD happen without actually pushing/hanging
git push --dry-run -v origin main >> $TARGET_FILE 2>&1

echo -e "\n--- DONE ---" >> $TARGET_FILE
