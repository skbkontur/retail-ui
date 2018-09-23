call yarn run clean
call yarn run build
robocopy dist ..\..\react-ui-testing-gh-pages /MIR /XD .git /XF .gitignore

pushd ..\..\react-ui-testing-gh-pages
git add -A
git commit --allow-empty -m "Update docs"
git push origin gh-pages
popd
