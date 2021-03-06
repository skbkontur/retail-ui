package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'ReactUI_LintTest'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("ReactUI_LintTest")) {
    failureConditions {

        check(executionTimeoutMin == 0) {
            "Unexpected option value: executionTimeoutMin = $executionTimeoutMin"
        }
        executionTimeoutMin = 10
    }
}
