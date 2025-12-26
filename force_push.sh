#!/bin/bash
date > force_timestamp.txt
git add .
git commit -m "Force update for Vercel detection"
git push -u origin main > push_log.txt 2>&1
echo "Push exit code: $?" >> push_log.txt
