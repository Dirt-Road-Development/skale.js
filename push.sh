#!/bin/bash

commitMsg=$@

npm install

git add .

git commit -am "OG: $commitMsg"

git push