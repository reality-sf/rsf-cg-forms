#!/usr/bin/env bash

set -eo pipefail

TARGET_SITE=${TARGET_SITE:-cg-leaders}

cd $TARGET_SITE
npm run deploy
