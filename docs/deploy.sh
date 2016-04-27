#!/bin/bash -e

cd "$(dirname "$0")"

REPO_SLUG="skbkontur/react-ui"
PAGES_CHECKOUT="$HOME/dev/retail-ui-gh-pages"
COMMIT=`git rev-parse HEAD`

rm -rf dist
./node_modules/.bin/webpack -p --colors

mkdir -p "$PAGES_CHECKOUT"
git -C "$PAGES_CHECKOUT" init
git -C "$PAGES_CHECKOUT" checkout -B gh-pages
rm -rf "$PAGES_CHECKOUT/dist" "$PAGES_CHECKOUT/index.html"
git -C "$PAGES_CHECKOUT" pull -q --depth 20 "git@github.com:${REPO_SLUG}.git" gh-pages

cp -r dist index.html "$PAGES_CHECKOUT"
git -C "$PAGES_CHECKOUT" add -f -A .
git -C "$PAGES_CHECKOUT" commit -m "Updating to $COMMIT"

git -C "$PAGES_CHECKOUT" push -q "git@github.com:${REPO_SLUG}.git" gh-pages 2>/dev/null
