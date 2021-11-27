#!/usr/bin/env sh

dir_dist='dist'
path_dist="${PWD}/${dir_dist}"

[ -d "$path_dist" ] \
  && rm -r "${path_dist}/"*

mkdir -p "$path_dist"
