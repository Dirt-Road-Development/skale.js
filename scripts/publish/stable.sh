#!/bin/bash

echo "Preparing Beta Release"

npm install --omit-dev

npx lerna link

npm run build

npx lerna publish prerelease --since HEAD~1 --no-git-reset -y --dist-tag beta

git add .
git commit -am "Updated Pre-release Version"
git push