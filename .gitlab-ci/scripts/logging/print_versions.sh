#!/usr/bin/env bash
source ./.gitlab-ci/scripts/logging/logging.sh

REACT=${REACT_VERSION:-18}
TYPESCRIPT=${TYPESCRIPT_VERSION:-4}
STRICT=${STRICT_MODE:-'false'}

#надо будет докинуть условие на crevey Report -- тк сейчас они будут друг друга перетирать
package_path=$1
CreeveyReport=$(cat <<-END
    {
        \"external_link\": {
            \"label\": \"Creevey Report\",
            \"url\": \"https://ui.gitlab-pages.kontur.host/-/$package_path/-/jobs/$CI_JOB_ID/artifacts/packages/react-ui/reports/index.html\"
        }
    }
END
)


echo """{
    \"$(date +%s)\": [
        $(if [[ $CI_JOB_NAME =~ "Screenshot" ]]; then
              $CreeveyReport
          fi
        )
        {
            \"external_link\": {
                \"label\": \"====Version variables====\",
                \"url\": \"\"
            }
        },
        {
            \"external_link\": {
                \"label\": \"React=$REACT\",
                \"url\": \"\"
            }
        },
        {
            \"external_link\": {
                \"label\": \"TYPESCRIPT=$TYPESCRIPT\",
                \"url\": \"\"
            }
        },
        {
            \"external_link\": {
                \"label\": \"STRICT MODE=$STRICT\",
                \"url\": \"\"
            }
        }
    ]
}""" > $CI_PROJECT_DIR/annotations.json
