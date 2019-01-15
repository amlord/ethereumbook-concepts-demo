#!/bin/bash

# new line character
NEWLINE=$'\n'

# remove previous build files
rm -f ./contracts/solidity/build/*

# loop through all contracts in the `src` directory
for file in ./contracts/solidity/src/*; do
  # echo the file to be compiled
  echo "${NEWLINE}> Compiling: $(basename "$file")"

  # compile the file
  docker-compose run solidity --optimize --bin --metadata --overwrite -o ./contracts/build /contracts/src/$(basename "$file")
done

echo "${NEWLINE}"
