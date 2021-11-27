#!/usr/bin/env sh

git config core.hooksPath .hooks \
  && printf "Git hooks registered.\n"

yarn install
