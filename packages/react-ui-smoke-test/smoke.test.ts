import path from 'path';
import fs from 'fs';
import os from 'os'
import { ChildProcess, spawn, execSync } from 'child_process';

import puppeteer  from 'puppeteer';
import waitOn from 'wait-on';

const LOAD_PAGE_TIMEOUT = 60000;
const BUILD_REACTUI_TIMEOUT = 120000;
const TIMEOUT = 240000;

const deprecatedComponents = [
  'Fias',
  'FiasSearch',
  'Logotype',
  'TopBar',
  'Logotype',
  'LocaleProvider'
];

describe('React-ui smoke test', () => {
  let buildServerProcess: ChildProcess | undefined;
  const globalConsoleError = console.error;
  const runOnTeamcity = 'TEAMCITY_VERSION' in process.env;

  const appName = 'test-app';
  const tempDirectory = path.join(__dirname, 'temp');
  const appDirectory = path.join(tempDirectory, appName);
  const templateDirectory = path.join(__dirname, 'cra-template-react-ui');
  const screenshotPath = path.join(tempDirectory, 'reactUIControls.png');

  const reactUIPackagePath = runOnTeamcity
    ? getPackagePathOnTeamcity()
    : path.join(tempDirectory, "react-ui.tgz");

  beforeEach(() => {
    console.error = jest.fn(globalConsoleError);

    if (!runOnTeamcity) {
      if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory)
      }
      buildReactUI(reactUIPackagePath);
    }
  }, BUILD_REACTUI_TIMEOUT);

  afterEach(() => {
    console.error = globalConsoleError;
    if (buildServerProcess && !buildServerProcess.killed) {
      buildServerProcess.kill();
    }
  });

  it('Build and render all controls', async () => {
    initApplication(appDirectory, templateDirectory, reactUIPackagePath);
    buildServerProcess = runDevServer(appDirectory);
    await openPageOnBrowser(screenshotPath);

    expect(console.error).not.toBeCalled();
  }, TIMEOUT);
});

function buildReactUI(reactUIPackagePath: string) {
  const reactUIPath = path.join(__dirname, "../react-ui");
  const buildPath = path.join(reactUIPath, "build");

  execSync(
    `yarn prerelease`,
    { cwd: reactUIPath, stdio: 'inherit' }
  );

  execSync(
    `yarn pack --filename ${reactUIPackagePath}`,
    { cwd: buildPath, stdio: 'inherit' }
  );
}

function initApplication(appDirectory: string, templateDirectory: string, reactUIPackagePath: string) {
  execSync(
    `npx create-react-app@next ${appDirectory} --template file:${templateDirectory}`,
    { stdio: 'inherit' }
  );

  execSync(
    `npm i @types/node @types/react @types/react-dom @types/jest -D`,
    { cwd: appDirectory, stdio: 'inherit' }
  );

  // yarn save and get package from cache
  // https://github.com/yarnpkg/yarn/issues/2165
  execSync(
    `npm install ${reactUIPackagePath}`,
    { cwd: appDirectory, stdio: 'inherit' }
  );
}

function runDevServer(appFolder: string): ChildProcess {
   return spawn(
    "node",
    ["node_modules/react-scripts/bin/react-scripts.js", "start"],
    { env: {
        ...process.env,
        BROWSER: "none",
        SKIP_PREFLIGHT_CHECK: "true"
      },
      cwd: appFolder,
      stdio: 'inherit',
    });
}

const deprecatedComponentWarning = new RegExp(`^Warning: (${deprecatedComponents.join('|')}) has been deprecated`);

async function openPageOnBrowser(screenshotPath: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1024,
  });

  page.on('console', msg => {
    if (msg.type() === "error" && !deprecatedComponentWarning.test(msg.text())) {
      console.error(`BROWSER: ${msg.text()}`);
    }
  });

  page.on('error', msg => {
    console.error(`BROWSER: name: ${msg.name}\nmessage: ${msg.message}\nstack: ${msg.stack}`);
  });

  page.on("pageerror", msg => {
    console.error(`BROWSER: name: ${msg.name}\nmessage: ${msg.message}\nstack: ${msg.stack}`);
  });

  const applicationHost = `http://${os.hostname()}:3000`;
  await waitOn({ resources: [applicationHost], timeout: LOAD_PAGE_TIMEOUT });
  await page.goto(applicationHost);
  await page.screenshot({ path: screenshotPath });

  if (await page.$(`#react-ui-page`) === null) {
    console.error(`BROWSER: Failed to load controls page.`);
  }

  await browser.close();
}

function getPackagePathOnTeamcity(): string {
  const repositoryPath = path.join(__dirname, '..', '..');
  const files = fs.readdirSync(repositoryPath);
  const packageName = files.find(file => file.startsWith('skbkontur-react-ui-') && file.endsWith(".tgz"));

  if (packageName) {
    return path.join(repositoryPath, packageName);
  }
  throw new Error(`react-ui tgz package not found into "${repositoryPath}" directory`);
}
