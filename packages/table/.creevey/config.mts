import { CreeveyConfig, hybridStoriesProvider } from "creevey";
import type { LaunchOptions } from "playwright-core";
import { PlaywrightWebdriver } from "creevey/playwright";
import { config as dotenv } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv({ path: "../../.env" });

/**
 * Debugging: `creevey --debug` → full trace in report;
 * find broken test in logs, e.g. [chrome:36368], open reports/traces/36368
 * in https://trace.playwright.dev
 */

const isCI = Boolean(process.env.CI) || Boolean(process.env.GITLAB_CI);
const reportFilePath = path.resolve(__dirname, "..", "reports");
const playwrightOptions: LaunchOptions = {
  ignoreDefaultArgs: ["--hide-scrollbars"],
};

const config: CreeveyConfig = {
  useDocker: !isCI,
  webdriver: PlaywrightWebdriver,
  storybookAutorunCmd: "yarn storybook:test",
  storiesProvider: hybridStoriesProvider,
  testsRegex: /\.creevey.(m|c)?(t|j)s$/,
  testsDir: path.join(__dirname, "../"),
  reportDir: reportFilePath,
  screenDir: path.join(__dirname, "images"),
  maxRetries: isCI ? 5 : 0,
  reporter: isCI ? "junit" : undefined,
  reporterOptions: {
    outputFile: isCI ? path.join(reportFilePath, "junit.xml") : undefined,
  },
  diffOptions: { threshold: 0.005, includeAA: false },
  browsers: {
    chrome: {
      browserName: "chromium",
      viewport: { width: 1024, height: 720 },
      playwrightOptions,
    },
    firefox: {
      browserName: "firefox",
      viewport: { width: 1024, height: 720 },
      playwrightOptions,
    },
  },
  experimental: {
    npmRegistry: process.env.PACKAGE_REGISTRY,
    reportOnlyFailedTests: isCI,
  },
};

export default config;
