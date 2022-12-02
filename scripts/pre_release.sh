#!/bin/bash

echo "Preparing for Pre-release"

npm install

npx lerna link

npm run build

npx lerna publish prerelease --since HEAD~1 --no-git-reset -y

git add .
git commit -am "Updated Pre-release Version"
git push -u origin development