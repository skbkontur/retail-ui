import { exec, spawn, spawnSync } from 'child_process';
import type { ChildProcess} from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

import puppeteer from 'puppeteer';
import { vi } from 'vitest';
import waitOn from 'wait-on';

const execAsync = promisify(exec);
const LOAD_PAGE_TIMEOUT = 60000;
const SSR_TIMEOUT = 240000;
const BUILD_REACTUI_TIMEOUT = 120000;
const TIMEOUT = 480000;

function logStage(stage: string) {
  // Force visible progress so a timeout pinpoints which stage hung.
  process.stdout.write(`[smoke] ${new Date().toISOString()} ${stage}\n`);
}

describe('React-ui smoke test', () => {
  let serveProcess: ChildProcess | undefined;
  const globalConsoleError = console.error;
  const runOnTeamcity = 'TEAMCITY_VERSION' in process.env;

  const appName = 'test-app';
  const tempDirectory = path.join(__dirname, 'temp');
  const appDirectory = path.join(tempDirectory, appName);
  const templateDirectory = path.join(__dirname, 'cra-template-react-ui');
  const screenshotPath = path.join(tempDirectory, 'reactUIControls.png');

  const reactUIPackagePath = runOnTeamcity ? getPackagePathOnTeamcity() : path.join(tempDirectory, 'react-ui.tgz');

  beforeAll(async () => {
    if (!runOnTeamcity) {
      if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory);
      }
      await buildReactUI(reactUIPackagePath);
    }
  }, BUILD_REACTUI_TIMEOUT);

  beforeEach(() => {
    console.error = vi.fn(globalConsoleError);
  });

  afterEach(() => {
    console.error = globalConsoleError;
    if (serveProcess && !serveProcess.killed) {
      serveProcess.kill();
    }
  });

  it(
    'Build and render all controls',
    async () => {
      logStage('initApplication: start');
      await initApplication(appDirectory, templateDirectory, reactUIPackagePath);
      logStage('initApplication: done');
      logStage('buildApplication: start');
      buildApplication(appDirectory);
      logStage('buildApplication: done');
      logStage('serveApplication: start');
      serveProcess = serveApplication(appDirectory);
      logStage('openPageOnBrowser: start');
      await openPageOnBrowser(screenshotPath);
      logStage('openPageOnBrowser: done');

      expect(console.error).not.toHaveBeenCalled();
    },
    TIMEOUT,
  );

  it('Render all controls and validations on server side (SSR)', async () => {
    await execAsync(`yarn install`, { cwd: path.join(__dirname, 'react-ui-ssr') });        

    const { stdout: stdoutServer, stderr: stderrServer } = await execAsync(`yarn server`, { cwd: path.join(__dirname, 'react-ui-ssr') });
    if (stderrServer) {
      console.error(stderrServer);
    }
    if (stdoutServer) {
      console.log(stdoutServer);
    }
    expect(console.error).not.toHaveBeenCalled();
  }, SSR_TIMEOUT);
});

async function buildReactUI(reactUIPackagePath: string) {
  const reactUIPath = path.join(__dirname, '../react-ui');
  const buildPath = path.join(reactUIPath, 'build');

  const { stdout: stdoutBuild, stderr: stderrBuild } = await execAsync(`yarn build`, { cwd: reactUIPath });
  if (stderrBuild) {
    console.error(stderrBuild);
  }
  if (stderrBuild) {
    console.log(stdoutBuild);
  }

  const { stdout, stderr } = await execAsync(`yarn pack --filename ${reactUIPackagePath}`, { cwd: buildPath });
  if (stderr) {
    console.error(stderr);
  }
  if (stdout) {
    console.log(stdout);
  }
}

async function initApplication(appDirectory: string, templateDirectory: string, reactUIPackagePath: string) {
  logStage('create-react-app: start');
  await execAsync(`npx create-react-app@latest ${appDirectory} --template file:${templateDirectory}`, { });
  logStage('create-react-app: done');
  // yarn save and get package from cache
  // https://github.com/yarnpkg/yarn/issues/2165
  logStage('npm install react-ui: start');
  await execAsync(
    `npm install --loglevel=error --no-audit --no-fund --legacy-peer-deps ${reactUIPackagePath}`,
    { cwd: appDirectory },
  );
  logStage('npm install react-ui: done');
  patchReactJsxRuntimeImport(appDirectory);
}

function patchReactJsxRuntimeImport(appDirectory: string) {
  const reactPackagePath = path.join(appDirectory, 'node_modules/react/package.json');
  if (!fs.existsSync(reactPackagePath)) {
    return;
  }

  const reactVersion = JSON.parse(fs.readFileSync(reactPackagePath, 'utf8')).version;
  const reactMajor = Number.parseInt(reactVersion, 10);
  if (reactMajor !== 17) {
    return;
  }

  const baseIconPath = path.join(appDirectory, 'node_modules/@skbkontur/icons/src/BaseIcon.js');
  if (!fs.existsSync(baseIconPath)) {
    return;
  }

  const source = fs.readFileSync(baseIconPath, 'utf8');
  // CRA's webpack under React 17 doesn't resolve @skbkontur/icons'
  // bare `react/jsx-runtime` import, so patch only the temporary app.
  fs.writeFileSync(baseIconPath, source.replace(/react\/jsx-runtime/g, 'react/jsx-runtime.js'));
}

function buildApplication(appFolder: string) {
  spawnSync('node', ['node_modules/react-scripts/bin/react-scripts.js', 'build'], {
    env: {
      ...process.env,
      SKIP_PREFLIGHT_CHECK: 'true',
    },
    cwd: appFolder,
    stdio: 'inherit',
  });
}

function serveApplication(appFolder: string): ChildProcess {
  const buildFolder = path.join(appFolder, 'build');
  return spawn('yarn', ['serve', buildFolder], {
    env: {
      ...process.env,
      PORT: '3000',
    },
    stdio: 'inherit',
    shell: true,
  });
}

async function openPageOnBrowser(screenshotPath: string) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1024,
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`BROWSER: ${msg.text()}`);
    }
  });

  page.on('error', msg => {
    console.error(`BROWSER: name: ${msg.name}\nmessage: ${msg.message}\nstack: ${msg.stack}`);
  });

  page.on('pageerror', msg => {
    console.error(`BROWSER: name: ${msg.name}\nmessage: ${msg.message}\nstack: ${msg.stack}`);
  });

  const applicationHost = 'http://127.0.0.1:3000';
  await waitOn({ resources: [applicationHost], timeout: LOAD_PAGE_TIMEOUT });
  await page.goto(applicationHost);
  await page.screenshot({ path: screenshotPath });

  if ((await page.$(`#react-ui-page`)) === null) {
    console.error(`BROWSER: Failed to load controls page.`);
  }

  await browser.close();
}

function getPackagePathOnTeamcity(): string {
  const repositoryPath = path.join(__dirname, '..', '..');
  const files = fs.readdirSync(repositoryPath);
  const packageName = files.find(file => file.startsWith('skbkontur-react-ui-') && file.endsWith('.tgz'));

  if (packageName) {
    return path.join(repositoryPath, packageName);
  }
  throw new Error(`react-ui tgz package not found into "${repositoryPath}" directory`);
}
