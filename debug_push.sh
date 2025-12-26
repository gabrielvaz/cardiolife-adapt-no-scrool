#!/bin/bash
git push -u origin main > push_error.log 2>&1
echo "Exit Code: $?" >> push_error.log
