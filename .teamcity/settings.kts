import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.Swabra
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.pullRequests
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.sshAgent
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.swabra
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.MSBuildStep
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.dotnetBuild
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.dotnetTest
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.msBuild
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.nuGetInstaller
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.nuGetPublish
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.nunit
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.failureConditions.BuildFailureOnMetric
import jetbrains.buildServer.configs.kotlin.v2019_2.failureConditions.failOnMetricChange
import jetbrains.buildServer.configs.kotlin.v2019_2.projectFeatures.githubConnection
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.schedule
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2019_2.vcs.GitVcsRoot

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.

VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.

To debug settings scripts in command-line, run the

    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate

command and attach your debugger to the port 8000.

To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2020.1"

project {

    vcsRoot(RetailUiTags)
    vcsRoot(ReactUiTestingTags)
    vcsRoot(ReactUiValidationsTags)

    buildType(RunAll)

    template(ReactUI_GitHubFeatures)

    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        text("teamcity.runner.commandline.stdstreams.encoding", "UTF8", display = ParameterDisplay.HIDDEN, allowEmpty = true)
    }

    features {
        feature {
            id = "PROJECT_EXT_65"
            type = "IssueTracker"
            param("secure:password", "")
            param("name", "skbkontur/retail-ui")
            param("pattern", """#(\d+)""")
            param("authType", "anonymous")
            param("repository", "https://github.com/skbkontur/retail-ui")
            param("type", "GithubIssues")
            param("secure:accessToken", "")
            param("username", "")
        }
        githubConnection {
            id = "PROJECT_EXT_66"
            displayName = "GitHub.com"
            clientId = "ac69bdb75bcac9b85bc2"
            clientSecret = "credentialsJSON:871d5d18-0142-4dfe-8479-f02f56356687"
        }
    }

    cleanup {
        baseRule {
            all(days = 30)
        }
    }
    buildTypesOrder = arrayListOf(RunAll)

    subProject(ReactUI)
    subProject(Validations)
    subProject(SeleniumTesting)
}

object RunAll : BuildType({
    name = "Run All"

    allowExternalStatus = true
    type = BuildTypeSettings.Type.COMPOSITE

    vcs {
        root(DslContext.settingsRoot)

        showDependenciesChanges = true
    }

    triggers {
        schedule {
            schedulingPolicy = daily {
                hour = 0
            }
            branchFilter = "+:<default>"
            triggerBuild = always()
            withPendingChangesOnly = false
        }
    }

    features {
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:37119025-2749-4abf-8ed8-ff4221b59d50"
                }
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER_OR_COLLABORATOR
            }
        }
    }

    dependencies {
        snapshot(ReactUI_BuildRetailUi) {
        }
        snapshot(ReactUI_LintTest) {
        }
        snapshot(ReactUI_ScreenshotTests) {
        }
        snapshot(SeleniumTesting_Test) {
        }
        snapshot(Validations_Build) {
        }
        snapshot(Validations_LintTest) {
        }
    }
})

object ReactUI_GitHubFeatures : Template({
    name = "GitHub Features"

    triggers {
        vcs {
            id = "VCS_TRIGGER"
            branchFilter = "+:pull/*"
        }
    }

    failureConditions {
        failOnMetricChange {
            id = "BUILD_EXT_320"
            metric = BuildFailureOnMetric.MetricType.BUILD_DURATION
            threshold = 3600
            units = BuildFailureOnMetric.MetricUnit.DEFAULT_UNIT
            comparison = BuildFailureOnMetric.MetricComparison.MORE
            compareTo = value()
            stopBuildOnFailure = true
        }
    }

    features {
        swabra {
            id = "SWABRA"
            forceCleanCheckout = true
            lockingProcesses = Swabra.LockingProcessPolicy.KILL
        }
        pullRequests {
            id = "PULL_REQUESTS"
            provider = github {
                serverUrl = ""
                authType = token {
                    token = "credentialsJSON:37119025-2749-4abf-8ed8-ff4221b59d50"
                }
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER_OR_COLLABORATOR
            }
        }
        commitStatusPublisher {
            id = "COMMIT_STATUS_PUBLISHER"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:753f3391-1e06-4223-8a34-70a7c9adb2af"
                }
            }
        }
    }
})

object ReactUiTestingTags : GitVcsRoot({
    name = "react-ui-testing tags"
    url = "https://github.com/skbkontur/retail-ui.git"
    branchSpec = "+:refs/tags/react-ui-testing@*"
    useTagsAsBranches = true
})

object ReactUiValidationsTags : GitVcsRoot({
    name = "react-ui-validations tags"
    url = "https://github.com/skbkontur/retail-ui.git"
    branchSpec = "+:refs/tags/react-ui-validations@*"
    useTagsAsBranches = true
})

object RetailUiTags : GitVcsRoot({
    name = "retail-ui tags"
    url = "https://github.com/skbkontur/retail-ui.git"
    branchSpec = "+:refs/tags/@skbkontur/react-ui@*"
    useTagsAsBranches = true
})


object ReactUI : Project({
    name = "ReactUI"
    defaultTemplate = RelativeId("ReactUI_GitHubFeatures")

    buildType(ReactUI_LintTest)
    buildType(ReactUI_ScreenshotTests)
    buildType(ReactUI_BuildRetailUi)
    buildType(ReactUI_Publish)
    buildTypesOrder = arrayListOf(ReactUI_LintTest, ReactUI_ScreenshotTests, ReactUI_BuildRetailUi, ReactUI_Publish)
})

object ReactUI_BuildRetailUi : BuildType({
    name = "Build"

    artifactRules = """
        packages\react-ui\.storybook\build\default => storybook-default-%build.number%.zip
        packages\react-ui\skbkontur-react-ui-%build.number%.tgz
    """.trimIndent()

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui build")
        }
        step {
            name = "Pack @skbkontur/react-ui"
            id = "RUNNER_3"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui --cwd ./build pack --filename skbkontur-react-ui-%build.counter%.tgz")
        }
    }
})

object ReactUI_LintTest : BuildType({
    name = "Lint/Test"

    artifactRules = "packages/react-ui-smoke-test/temp/reactUIControls.png => smokeReactUI.zip"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Lint"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui lint")
        }
        step {
            name = "Test"
            id = "RUNNER_3"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui test")
        }
        step {
            name = "Smoke test"
            id = "RUNNER_4"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-smoke-test test")
        }
    }

    dependencies {
        dependency(ReactUI_BuildRetailUi) {
            snapshot {
                runOnSameAgent = true
            }

            artifacts {
                id = "ARTIFACT_DEPENDENCY_1"
                artifactRules = "skbkontur-react-ui-*.tgz"
            }
        }
    }
})

object ReactUI_Publish : BuildType({
    name = "Publish"

    params {
        password("env.NPM_TOKEN", "credentialsJSON:2cea5b86-4e77-4fb6-b21f-c8f564c39fa6", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Auth"
            id = "RUNNER_2"
            type = "jonnyzzz.npm"
            param("npm_commands", """config set "//registry.npmjs.org/:_authToken" "%env.NPM_TOKEN%"""")
        }
        step {
            name = "Publish"
            id = "RUNNER_3"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui release")
        }
        step {
            name = "Clean"
            id = "RUNNER_4"
            type = "jonnyzzz.npm"
            executionMode = BuildStep.ExecutionMode.ALWAYS
            param("npm_commands", """config delete "//registry.npmjs.org/:_authToken"""")
        }
    }

    triggers {
        vcs {
            id = "TRIGGER_1"
            branchFilter = "+:@skbkontur/react-ui@*"
        }
    }

    features {
        sshAgent {
            id = "BUILD_EXT_1"
            teamcitySshKey = "GitHub"
        }
    }

    disableSettings("COMMIT_STATUS_PUBLISHER", "PULL_REQUESTS", "VCS_TRIGGER")
})

object ReactUI_ScreenshotTests : BuildType({
    name = "Screenshot tests"

    artifactRules = "packages/react-ui/.creevey/report => report.zip"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build Storybook"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui storybook:build")
        }
        script {
            name = "Start"
            id = "RUNNER_3"
            scriptContent = """
                start /b yarn workspace @skbkontur/react-ui storybook:serve
                ping 127.0.0.1 -n 11
            """.trimIndent()
        }
        step {
            name = "Test UI"
            id = "RUNNER_4"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace @skbkontur/react-ui creevey")
        }
    }
})


object SeleniumTesting : Project({
    name = "SeleniumTesting"
    defaultTemplate = RelativeId("ReactUI_GitHubFeatures")

    buildType(SeleniumTesting_Publish)
    buildType(SeleniumTesting_Test)
    buildTypesOrder = arrayListOf(SeleniumTesting_Test, SeleniumTesting_Publish)
})

object SeleniumTesting_Publish : BuildType({
    name = "Publish"

    artifactRules = "packages/react-ui-testing/Output/*.nupkg"

    vcs {
        root(ReactUiTestingTags)

        branchFilter = """
            +:*
            -:<default>
        """.trimIndent()
    }

    steps {
        nuGetInstaller {
            name = "Install"
            id = "RUNNER_1"
            toolPath = "%teamcity.tool.NuGet.CommandLine.DEFAULT%"
            projects = "packages/react-ui-testing/SeleniumTesting.sln"
        }
        dotnetBuild {
            name = "Build"
            id = "RUNNER_2"
            projects = "packages/react-ui-testing/SeleniumTesting/SeleniumTesting.csproj"
            configuration = "Release"
            versionSuffix = "%teamcity.build.branch%"
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
        nuGetPublish {
            name = "Publish"
            id = "RUNNER_3"
            toolPath = "%teamcity.tool.NuGet.CommandLine.4.9.2%"
            packages = "packages/react-ui-testing/Output/*.nupkg"
            serverUrl = "https://api.nuget.org/v3/index.json"
            apiKey = "credentialsJSON:bd776d48-3dea-45bb-95d2-f28cdfb5e1aa"
        }
    }

    triggers {
        vcs {
            id = "TRIGGER_1"
        }
    }

    disableSettings("COMMIT_STATUS_PUBLISHER", "PULL_REQUESTS", "VCS_TRIGGER")
})

object SeleniumTesting_Test : BuildType({
    name = "Test"

    artifactRules = "packages/react-ui-testing/.screenshots => screenshots.zip"

    params {
        password("env.SAUCE_ACCESS_KEY", "credentialsJSON:a904ff94-f240-4ebf-af85-84e605d62caa", display = ParameterDisplay.HIDDEN, readOnly = true)
        password("env.SAUCE_USERNAME", "credentialsJSON:5e3c7241-13cd-4d36-ac4f-a8dceb001153", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", """
                workspace @skbkontur/react-ui build
                workspace react-ui-testing build
            """.trimIndent())
        }
        script {
            name = "Start"
            id = "RUNNER_3"
            scriptContent = """
                start /b yarn workspace react-ui-testing start
                ping 127.0.0.1 -n 11
            """.trimIndent()
        }
        dotnetTest {
            name = "Test"
            id = "RUNNER_4"
            projects = "packages/react-ui-testing/Tests/Tests.csproj"
            framework = "netcoreapp3.1"
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
    }
})


object Validations : Project({
    name = "Validations"
    defaultTemplate = RelativeId("ReactUI_GitHubFeatures")

    buildType(Validations_Build)
    buildType(Validations_LintTest)
    buildType(Validations_Publish)
    buildTypesOrder = arrayListOf(Validations_LintTest, Validations_Build, Validations_Publish)
})

object Validations_Build : BuildType({
    name = "Build"

    artifactRules = """
        packages\react-ui-validations\react-ui-validations-*.tgz
        packages\react-ui-validations\skbkontur-react-ui-validations-*.tgz
    """.trimIndent()

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations build")
        }
        step {
            name = "PreDeploy"
            id = "RUNNER_3"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations predeploy")
        }
        step {
            name = "Pack react-ui-validations"
            id = "RUNNER_4"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations --cwd ./build/retail-ui-dist/ pack --filename react-ui-validations-%build.counter%.tgz")
        }
        step {
            name = "Pack @skbkontur/react-ui-validations"
            id = "RUNNER_5"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations --cwd ./build/react-ui-dist/ pack --filename skbkontur-react-ui-validations-%build.counter%.tgz")
        }
    }
})

object Validations_LintTest : BuildType({
    name = "Lint/Test"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Lint"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations lint")
        }
        step {
            name = "Run unit tests"
            id = "RUNNER_3"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations test")
        }
        script {
            name = "Start Storybook"
            id = "RUNNER_4"
            scriptContent = """
                start /b yarn workspace react-ui-validations storybook
                ping 127.0.0.1 -n 60
            """.trimIndent()
        }
        nuGetInstaller {
            name = "NuGet Restore"
            id = "RUNNER_5"
            toolPath = "%teamcity.tool.NuGet.CommandLine.4.9.3%"
            projects = "packages/react-ui-validations/selenium-tests/SeleniumTests.sln"
        }
        msBuild {
            name = "Build tests"
            id = "RUNNER_6"
            path = "packages/react-ui-validations/selenium-tests/SeleniumTests.sln"
            version = MSBuildStep.MSBuildVersion.V15_0
            toolsVersion = MSBuildStep.MSBuildToolsVersion.V15_0
        }
        nunit {
            name = "Run tests"
            id = "RUNNER_7"
            nunitPath = "%teamcity.tool.NUnit.Console.DEFAULT%"
            includeTests = """packages\react-ui-validations\selenium-tests\ValidationTests\bin\Debug\ValidationTests.dll"""
        }
    }
})

object Validations_Publish : BuildType({
    name = "Publish"

    params {
        password("env.NPM_TOKEN", "credentialsJSON:2cea5b86-4e77-4fb6-b21f-c8f564c39fa6", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(ReactUiValidationsTags)

        branchFilter = """
            +:*
            -:<default>
        """.trimIndent()
    }

    steps {
        step {
            name = "Install"
            id = "RUNNER_1"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            id = "RUNNER_2"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations build")
        }
        step {
            name = "Auth"
            id = "RUNNER_3"
            type = "jonnyzzz.npm"
            param("npm_commands", """config set "//registry.npmjs.org/:_authToken" "%env.NPM_TOKEN%"""")
        }
        step {
            name = "Publish"
            id = "RUNNER_4"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations deploy")
        }
        step {
            name = "Clean"
            id = "RUNNER_5"
            type = "jonnyzzz.npm"
            executionMode = BuildStep.ExecutionMode.ALWAYS
            param("npm_commands", """config delete "//registry.npmjs.org/:_authToken"""")
        }
    }

    triggers {
        vcs {
            id = "TRIGGER_1"
        }
    }

    features {
        sshAgent {
            id = "BUILD_EXT_1"
            teamcitySshKey = "GitHub"
        }
    }

    disableSettings("COMMIT_STATUS_PUBLISHER", "PULL_REQUESTS", "VCS_TRIGGER")
})
