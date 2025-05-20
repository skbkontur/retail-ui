#!/usr/bin/env bash
source ./.gitlab-ci/scripts/logging/logging.sh

REACT=${REACT_VERSION:-18}
TYPESCRIPT=${TYPESCRIPT_VERSION:-4}
STRICT=${STRICT_MODE:-'false'}

package_path=$1
CreeveyReport=$(cat <<-END
    {
        "external_link": {
            "label": "Creevey Report",
            "url": "https://ui.gitlab-pages.kontur.host/-/react-ui/-/jobs/$CI_JOB_ID/artifacts/packages/${package_path#@skbkontur}/reports/index.html"
        }
    },
END
)

echo """{
    \"$(date +%s)\": [
        $(if [[ $CI_JOB_NAME =~ "Screenshot" ]]; then
             echo "$CreeveyReport"
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
