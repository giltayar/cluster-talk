#!/usr/bin/env bash
number=$1
shift
for n in $(seq $number); do
  curl http://localhost:8000/hello
done
