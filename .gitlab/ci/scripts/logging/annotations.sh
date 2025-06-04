#!/usr/bin/env bash

LABEL=$1
URL=$2

echo """{
    \"$(date +%s)\": [
        {
            \"external_link\": {
                \"label\": \"$LABEL\",
                \"url\": \"$URL\"
            }
        }
    ]
}""" > $CI_PROJECT_DIR/annotations.json
