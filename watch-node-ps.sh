#!/usr/bin/env bash

 watch -n 1 -d ps aux \| grep node \| grep -v grep \| grep -v watch-node-ps \| sort
