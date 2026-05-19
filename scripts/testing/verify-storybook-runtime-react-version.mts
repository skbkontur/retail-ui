import { readFileSync } from 'fs';
import { resolve } from 'path';
import { chromium } from 'playwright-core';
import type { Page } from 'playwright-core';

const expectedReactVersion = process.env.REACT_VERSION ?? '19';
const storybookPort = process.env.STORYBOOK_PORT ?? '6060';
const storybookUrl = process.env.STORYBOOK_URL ?? `http://127.0.0.1:${storybookPort}/iframe.html`;
const packageJsonPath = resolve(process.cwd(), 'package.json');
const packageName = readPackageName(packageJsonPath);

async function main() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    const actualReactVersion = await readRuntimeReactVersion(page);

    console.log(
      `[debug]: storybook browser runtime for ${packageName}: react=${actualReactVersion}; expected major=${expectedReactVersion}`,
    );

    if (getMajor(actualReactVersion) !== getMajor(expectedReactVersion)) {
      console.error(
        `[debug]: storybook browser runtime mismatch for ${packageName}: expected=${expectedReactVersion}, actual=${actualReactVersion}`,
      );
      process.exit(1);
    }
  } finally {
    await browser.close();
  }
}

async function readRuntimeReactVersion(page: Page) {
  const attempts = 30;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await page.goto(storybookUrl, { waitUntil: 'domcontentloaded', timeout: 2_000 });
      await page.waitForFunction(() => Boolean(window.__STORYBOOK_REACT_VERSION__), undefined, { timeout: 2_000 });

      const version = await page.evaluate(() => window.__STORYBOOK_REACT_VERSION__);
      if (!version) {
        throw new Error('window.__STORYBOOK_REACT_VERSION__ is empty');
      }

      return version;
    } catch (error) {
      if (attempt === attempts) {
        throw new Error(
          `Failed to read storybook runtime react version from ${storybookUrl}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      await page.waitForTimeout(1_000);
    }
  }

  throw new Error(`Failed to read storybook runtime react version from ${storybookUrl}`);
}

function readPackageName(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')).name ?? filePath;
}

function getMajor(version: string) {
  return version.match(/\d+/)?.[0];
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
