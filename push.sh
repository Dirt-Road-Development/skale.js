#!/bin/bash

commitMsg=$@

git add .

git commit -am "OG: $commitMsg"

git push