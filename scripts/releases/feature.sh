#!/bin/bash

echo "Preparing for Feature Release"

npm install  --omit-dev

npx lerna link

npm run build

npx lerna publish minor --since HEAD~1 --no-git-reset -y

git add .
git commit -am "New Feature Merged into Main"
git push -u origin main 