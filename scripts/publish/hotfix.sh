#!/bin/bash

echo "Preparing for Stable Hotifx"

npm install --omit-dev

npx lerna link

npm run build

npx lerna publish minor --since HEAD~1 --no-git-reset -y

git add .
git commit -am "Hotfix Merge to Stable"
git push -u origin stable