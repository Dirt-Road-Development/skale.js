#!/bin/bash

echo "Preparing for Pre-release"

npm install

npx lerna link

npm run build

npx lerna version prerelease --since HEAD~1

npm run publish

git add .
git commit -am "Updated Pre-release Version"
git push -u origin development