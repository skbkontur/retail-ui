#!/bin/bash
source ./.gitlab/ci/scripts/logging/logging.sh

package_name=$1
package_version=$2
section_id="Deploy Docs for $package_name version $package_version"

startLogCollapsedSection "$section_id"

git clone https://oauth2:$GITLAB_COMMITER_TOKEN@git.skbkontur.ru/ui/docs.git ../docs
mkdir -p ../docs/docs/storybook/$package_name/$package_version
cp -r ./packages/$package_name/.storybook/build/* ../docs/docs/storybook/$package_name/$package_version
cd ../docs
git config user.email "ci-commiter@email.com"
git config user.name "ci-commiter"
git add .
git commit -m "deploy docs from react-ui ci job $CI_JOB_ID" -q
git pull --rebase
git push origin master

endLogSection "$section_id"
