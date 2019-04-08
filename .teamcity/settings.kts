import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.Swabra
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.pullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.sshAgent
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.swabra
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.MSBuildStep
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.dotnetBuild
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.dotnetTest
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.msBuild
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.nunit
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.schedule
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2018_2.vcs.GitVcsRoot

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

version = "2018.2"

project {

    vcsRoot(ReactUiTestingTags)
    vcsRoot(RetailUi)
    vcsRoot(HttpsGithubComSkbkonturRetailUiRefsHeadsMaster_2)
    vcsRoot(ReactUiValidationsTags)
    vcsRoot(RetailUiTags)

    buildType(SeleniumTesting)
    buildType(RunAll)
    buildType(PublishRetailUi)
    buildType(LintTestReactUiValidations)
    buildType(TestConfig)
    buildType(LintAndTest)
    buildType(TestUi)
    buildType(Build)
    buildType(BuildReactUiValidations)
    buildType(PublishReactUiValidations)
    buildType(PublishReactUiTesting)

    params {
        text("teamcity.runner.commandline.stdstreams.encoding", "UTF8", display = ParameterDisplay.HIDDEN, allowEmpty = true)
    }

    features {
        feature {
            id = "PROJECT_EXT_161"
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
        feature {
            id = "PROJECT_EXT_37"
            type = "OAuthProvider"
            param("clientId", "ac69bdb75bcac9b85bc2")
            param("defaultTokenScope", "public_repo,repo,repo:status,write:repo_hook")
            param("secure:clientSecret", "credentialsJSON:871d5d18-0142-4dfe-8479-f02f56356687")
            param("displayName", "GitHub.com")
            param("gitHubUrl", "https://github.com/")
            param("providerType", "GitHub")
        }
    }

    cleanup {
        all(days = 30)
    }
    buildTypesOrder = arrayListOf(RunAll, LintAndTest, LintTestReactUiValidations, SeleniumTesting, TestUi, Build, BuildReactUiValidations, PublishRetailUi, PublishReactUiValidations, PublishReactUiTesting)
}

object Build : BuildType({
    name = "Build retail-ui"

    artifactRules = """
        packages\retail-ui\retail-ui-*.tgz
        packages\retail-ui\skbkontur-react-ui-*.tgz
    """.trimIndent()

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui build")
        }
        step {
            name = "Pack retail-ui"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui pack --filename retail-ui-%build.counter%.tgz")
        }
        step {
            name = "Pack @skbkontur/react-ui"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui --cwd ./build pack --filename skbkontur-react-ui-%build.counter%.tgz")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
    }
})

object BuildReactUiValidations : BuildType({
    name = "Build react-ui-validations"

    artifactRules = """
        packages\react-ui-validations\react-ui-validations-*.tgz
        packages\react-ui-validations\skbkontur-react-ui-validations-*.tgz
    """.trimIndent()

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations build")
        }
        step {
            name = "PreDeploy"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations predeploy")
        }
        step {
            name = "Pack react-ui-validations"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations --cwd ./build/retail-ui-dist/ pack --filename react-ui-validations-%build.counter%.tgz")
        }
        step {
            name = "Pack @skbkontur/react-ui-validations"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations --cwd ./build/react-ui-dist/ pack --filename skbkontur-react-ui-validations-%build.counter%.tgz")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
    }
})

object LintAndTest : BuildType({
    name = "Lint/Test retail-ui"

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Lint"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui lint")
        }
        step {
            name = "Test"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui test")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
    }
})

object LintTestReactUiValidations : BuildType({
    name = "Lint/Test react-ui-validations"

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Lint"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations lint")
        }
        script {
            name = "Start Storybook"
            scriptContent = """
                start /b yarn workspace react-ui-validations storybook
                ping 127.0.0.1 -n 60
            """.trimIndent()
        }
        step {
            name = "NuGet Restore"
            type = "jb.nuget.installer"
            param("nuget.path", "%teamcity.tool.NuGet.CommandLine.4.9.3%")
            param("nuget.updatePackages.mode", "sln")
            param("sln.path", "packages/react-ui-validations/selenium-tests/SeleniumTests.sln")
        }
        msBuild {
            name = "Build tests"
            path = "packages/react-ui-validations/selenium-tests/SeleniumTests.sln"
            toolsVersion = MSBuildStep.MSBuildToolsVersion.V15_0
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
        nunit {
            name = "Run tests"
            nunitPath = "%teamcity.tool.NUnit.Console.DEFAULT%"
            includeTests = """packages\react-ui-validations\selenium-tests\ValidationTests\bin\Debug\ValidationTests.dll"""
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
            lockingProcesses = Swabra.LockingProcessPolicy.KILL
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
    }
})

object PublishReactUiTesting : BuildType({
    name = "Publish react-ui-testing"

    artifactRules = "packages/react-ui-testing/Output/*.nupkg"

    vcs {
        root(ReactUiTestingTags)

        buildDefaultBranch = false
    }

    steps {
        step {
            name = "Install"
            type = "jb.nuget.installer"
            param("nuget.path", "%teamcity.tool.NuGet.CommandLine.DEFAULT%")
            param("nuget.updatePackages.mode", "sln")
            param("sln.path", "packages/react-ui-testing/SeleniumTesting.sln")
        }
        dotnetBuild {
            name = "Build"
            projects = "packages/react-ui-testing/SeleniumTesting/SeleniumTesting.csproj"
            configuration = "Release"
            versionSuffix = "%teamcity.build.branch%"
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
        step {
            name = "Publish"
            type = "jb.nuget.publish"
            param("secure:nuget.api.key", "credentialsJSON:53edc6c7-2259-4fcc-9ea2-5e869ab8ee43")
            param("nuget.path", "%teamcity.tool.NuGet.CommandLine.4.9.2%")
            param("nuget.publish.source", "https://api.nuget.org/v3/index.json")
            param("nuget.publish.files", "packages/react-ui-testing/Output/*.nupkg")
        }
    }

    triggers {
        vcs {
        }
    }
})

object PublishReactUiValidations : BuildType({
    name = "Publish react-ui-validations"

    params {
        password("env.NPM_TOKEN", "credentialsJSON:2cea5b86-4e77-4fb6-b21f-c8f564c39fa6", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(ReactUiValidationsTags)

        buildDefaultBranch = false
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations build")
        }
        step {
            name = "Auth"
            type = "jonnyzzz.npm"
            param("npm_commands", """config set "//registry.npmjs.org/:_authToken" "%env.NPM_TOKEN%"""")
        }
        step {
            name = "Publish"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-validations deploy")
        }
        step {
            name = "Clean"
            type = "jonnyzzz.npm"
            executionMode = BuildStep.ExecutionMode.ALWAYS
            param("npm_commands", """config delete "//registry.npmjs.org/:_authToken"""")
        }
    }

    triggers {
        vcs {
        }
    }

    features {
        sshAgent {
            teamcitySshKey = "GitHub"
        }
    }
})

object PublishRetailUi : BuildType({
    name = "Publish retail-ui"

    params {
        password("env.NPM_TOKEN", "credentialsJSON:2cea5b86-4e77-4fb6-b21f-c8f564c39fa6", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(RetailUiTags)

        buildDefaultBranch = false
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Auth"
            type = "jonnyzzz.npm"
            param("npm_commands", """config set "//registry.npmjs.org/:_authToken" "%env.NPM_TOKEN%"""")
        }
        step {
            name = "Publish"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace retail-ui publish")
        }
        step {
            name = "Clean"
            type = "jonnyzzz.npm"
            executionMode = BuildStep.ExecutionMode.ALWAYS
            param("npm_commands", """config delete "//registry.npmjs.org/:_authToken"""")
        }
    }

    triggers {
        vcs {
        }
    }

    features {
        sshAgent {
            teamcitySshKey = "GitHub"
        }
    }
})

object RunAll : BuildType({
    name = "Run All"

    allowExternalStatus = true
    type = BuildTypeSettings.Type.COMPOSITE

    vcs {
        root(RetailUi)

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
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
    }

    dependencies {
        snapshot(Build) {
        }
        snapshot(BuildReactUiValidations) {
        }
        snapshot(LintAndTest) {
        }
        snapshot(LintTestReactUiValidations) {
        }
        snapshot(SeleniumTesting) {
        }
        snapshot(TestUi) {
        }
    }
})

object SeleniumTesting : BuildType({
    name = "SeleniumTesting"

    artifactRules = "packages/react-ui-testing/.screenshots => screenshots.zip"

    params {
        password("env.SAUCE_ACCESS_KEY", "credentialsJSON:a904ff94-f240-4ebf-af85-84e605d62caa", display = ParameterDisplay.HIDDEN, readOnly = true)
        password("env.SAUCE_USERNAME", "credentialsJSON:5e3c7241-13cd-4d36-ac4f-a8dceb001153", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Build"
            type = "jonnyzzz.yarn"
            param("yarn_commands", """
                workspace retail-ui build
                workspace react-ui-testing build
            """.trimIndent())
        }
        script {
            name = "Start"
            scriptContent = """
                start /b yarn workspace react-ui-testing start
                ping 127.0.0.1 -n 11
            """.trimIndent()
        }
        dotnetTest {
            name = "Test"
            projects = "packages/react-ui-testing/Tests/Tests.csproj"
            framework = "netcoreapp2.1"
            param("dotNetCoverage.dotCover.home.path", "%teamcity.tool.JetBrains.dotCover.CommandLineTools.DEFAULT%")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
            lockingProcesses = Swabra.LockingProcessPolicy.KILL
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
    }
})

object TestConfig : BuildType({
    name = "TestConfig"

    vcs {
        root(HttpsGithubComSkbkonturRetailUiRefsHeadsMaster_2)
    }

    steps {
        step {
            name = "hello"
            type = "jonnyzzz.node"
            param("node_script_text", "console.log('Hello TC!')")
            param("node_execution_mode", "script")
        }
    }

    triggers {
        vcs {
        }
    }
})

object TestUi : BuildType({
    name = "Screenshot tests"

    artifactRules = "packages/react-ui-screenshot-tests/html-report => html-report.zip"
    maxRunningBuilds = 1

    params {
        password("env.SAUCE_ACCESS_KEY", "credentialsJSON:a904ff94-f240-4ebf-af85-84e605d62caa", display = ParameterDisplay.HIDDEN, readOnly = true)
        password("env.SAUCE_USERNAME", "credentialsJSON:5e3c7241-13cd-4d36-ac4f-a8dceb001153", display = ParameterDisplay.HIDDEN, readOnly = true)
    }

    vcs {
        root(RetailUi)
    }

    steps {
        step {
            name = "Install"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "install")
        }
        step {
            name = "Test UI"
            type = "jonnyzzz.yarn"
            param("yarn_commands", "workspace react-ui-screenshot-tests test")
        }
    }

    triggers {
        vcs {
            branchFilter = "+:pull/*"
        }
    }

    features {
        swabra {
            forceCleanCheckout = true
            lockingProcesses = Swabra.LockingProcessPolicy.KILL
        }
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
            }
            param("github_oauth_user", "wKich")
        }
        pullRequests {
            provider = github {
                authType = token {
                    token = "credentialsJSON:e85896f8-074d-433d-af0c-704bc784121e"
                }
                filterTargetBranch = "refs/heads/master"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
    }
})

object HttpsGithubComSkbkonturRetailUiRefsHeadsMaster_2 : GitVcsRoot({
    name = "https://github.com/skbkontur/retail-ui#refs/heads/master"
    url = "https://github.com/skbkontur/retail-ui"
    authMethod = password {
        userName = "zhzz"
        password = "credentialsJSON:36ab2546-497c-4e37-84fd-380a2273fbe9"
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

object RetailUi : GitVcsRoot({
    name = "retail-ui"
    url = "https://github.com/skbkontur/retail-ui.git"
    branchSpec = "+:refs/heads/*"
})

object RetailUiTags : GitVcsRoot({
    name = "retail-ui tags"
    url = "https://github.com/skbkontur/retail-ui.git"
    branchSpec = "+:refs/tags/retail-ui@*"
    useTagsAsBranches = true
})
