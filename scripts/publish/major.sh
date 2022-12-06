#!/bin/bash

echo "Preparing for Major Release"

npm install  --omit-dev

npx lerna link

npm run build

npx lerna publish major --since HEAD~1 --no-git-reset -y

git add .
git commit -am "New Major Version"
git push -u origin stable