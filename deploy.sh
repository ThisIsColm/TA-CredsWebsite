#!/usr/bin/env bash
set -e

cd /root/TA-CredsWebsite

echo "==> Starting deployment..."

echo "==> Fetching latest code from origin/main..."
git fetch origin main
git reset --hard origin/main

echo "==> Installing dependencies..."
npm install

echo "==> Building app..."
npm run build

echo "==> Restarting PM2 process..."
pm2 restart ta-credswebsite

echo "==> Saving PM2 process list..."
pm2 save

echo "==> Deployment complete."