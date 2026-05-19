import { spawnSync } from 'child_process';
import { copyFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const reactVersion = process?.env?.REACT_VERSION;
const tsVersion = process?.env?.TYPESCRIPT_VERSION;
const shouldReset = process.argv.includes('--reset');

console.log('REACT_VERSION', process?.env?.REACT_VERSION);
console.log('TYPESCRIPT_VERSION', process?.env?.TYPESCRIPT_VERSION);
console.log('STRICT_MODE', process?.env?.STRICT_MODE);

const PATCHED_FILES = [
  ['package.json'],
  ['packages', 'react-ui', 'package.json'],
  ['packages', 'react-ui-validations', 'package.json'],
  ['packages', 'react-ui-smoke-test', 'cra-template-react-ui', 'template.json'],
];

const repoRoot = resolve(__dirname, '..', '..');

function backupPath(filePath: string): string {
  return `${filePath}.matrix-backup`;
}

function ensureBackup(filePath: string): void {
  const backup = backupPath(filePath);
  if (!existsSync(backup) && existsSync(filePath)) {
    copyFileSync(filePath, backup);
  }
}

function restoreBackups(): void {
  for (const parts of PATCHED_FILES) {
    const filePath = resolve(repoRoot, ...parts);
    const backup = backupPath(filePath);
    if (existsSync(backup)) {
      copyFileSync(backup, filePath);
      unlinkSync(backup);
      console.log(`[reset] restored ${filePath}`);
    }
  }
}

function patchPackages(reactVersion: string | undefined, tsVersion: string | undefined): void {
  const shouldPatchReact = reactVersion !== undefined;
  const shouldPatchTypescript = tsVersion !== undefined;

  const packagesPath = resolve(repoRoot, 'packages');
  const { react, typescript } = getJsonFile(resolve(__dirname, 'package-versions.json'));

  if (shouldPatchReact && !Object.prototype.hasOwnProperty.call(react, reactVersion)) {
    throw new Error(
      `[set-testing-package-versions] REACT_VERSION=${reactVersion} is not configured. Supported values: ${Object.keys(react).join(', ')}`,
    );
  }
  if (shouldPatchTypescript && !Object.prototype.hasOwnProperty.call(typescript, tsVersion)) {
    throw new Error(
      `[set-testing-package-versions] TYPESCRIPT_VERSION=${tsVersion} is not configured. Supported values: ${Object.keys(typescript).join(', ')}`,
    );
  }

  const packagesForReact: Record<string, string> | undefined = shouldPatchReact ? react[reactVersion] : undefined;
  const packagesForTypescript: Record<string, string> | undefined = shouldPatchTypescript
    ? typescript[tsVersion]
    : undefined;

  const allPackages: Record<string, string> = { ...packagesForReact, ...packagesForTypescript };

  if (Object.keys(allPackages).length === 0) {
    printManifestReactVersion(packagesPath, reactVersion);
    return;
  }

  // Backup every file we're about to touch so --reset can undo it later.
  for (const parts of PATCHED_FILES) {
    ensureBackup(resolve(repoRoot, ...parts));
  }

  try {
    if (packagesForReact && reactVersion) {
      patchSmokeTestPackage(packagesPath, packagesForReact, reactVersion);
      patchRootPackageJson(repoRoot, packagesForReact);
    }
    patchPackageJsons(packagesPath, allPackages);
    formatPatchedFiles();
    printManifestReactVersion(packagesPath, reactVersion);
  } catch (e) {
    console.log(e);
    process.exitCode = 1;
  }
}

function patchPackageJsons(packagesPath: string, packages: Record<string, string>) {
  const pathToReactUi = resolve(packagesPath, 'react-ui', 'package.json');
  const pathToReactUiValidation = resolve(packagesPath, 'react-ui-validations', 'package.json');
  [pathToReactUi, pathToReactUiValidation].forEach((packagePath) => {
    const json = getJsonFile(packagePath);
    // devDependencies: upsert — CI needs test-only packages (e.g. @testing-library/dom) that may be missing from the repo baseline.
    json.devDependencies = upsertDeps(json.devDependencies, packages);
    // dependencies: update-only — never promote a dev-only package to a runtime dependency.
    json.dependencies = updateExistingDeps(json.dependencies, packages);
    // In matrix mode, skip tsc type-checking: the codebase is written against
    // React 19 types and will not compile cleanly with older @types/react.
    // Matrix tests verify *runtime* compatibility, not type compatibility.
    if (json.scripts) {
      patchScriptsForMatrix(json.scripts);
    }
    writeJsonFile(packagePath, json);
    console.log(packagePath, 'patched');
  });
}

function patchRootPackageJson(repoRoot: string, packagesForReact: Record<string, string>) {
  const pathToRootPackageJson = resolve(repoRoot, 'package.json');
  const json = getJsonFile(pathToRootPackageJson);
  const nextResolutions = { ...(json.resolutions ?? {}) };

  if (packagesForReact.react) {
    nextResolutions.react = packagesForReact.react;
  }
  if (packagesForReact['react-dom']) {
    nextResolutions['react-dom'] = packagesForReact['react-dom'];
  }

  json.resolutions = nextResolutions;
  writeJsonFile(pathToRootPackageJson, json);
  console.log(pathToRootPackageJson, 'patched');
}

function patchScriptsForMatrix(scripts: Record<string, string>) {
  // Replace lint:tsc with no-op — type-checking is version-specific
  if (scripts['lint:tsc'] && !scripts['lint:tsc'].includes('[matrix] skipping tsc type-check')) {
    scripts['lint:tsc'] = 'echo "[matrix] skipping tsc type-check — runtime tests only"';
    console.log('  patched lint:tsc → skipped');
  }
  // Use --noCheck for build:tsc — still emits .js/.d.ts but skips type errors
  if (scripts['build:tsc'] && !scripts['build:tsc'].includes('--noCheck')) {
    scripts['build:tsc'] = scripts['build:tsc'].replace(/^tsc /, 'tsc --noCheck ');
    console.log('  patched build:tsc → --noCheck');
  }
}

function upsertDeps(
  packageSection: Record<string, string> | undefined,
  packages: Record<string, string>,
): Record<string, string> {
  return { ...(packageSection ?? {}), ...packages };
}

function updateExistingDeps(
  packageSection: Record<string, string> | undefined,
  packages: Record<string, string>,
): Record<string, string> | undefined {
  if (!packageSection) {
    return packageSection;
  }

  const nextDeps = { ...packageSection };
  Object.entries(packages).forEach(([packageName, packageVersion]) => {
    if (Object.prototype.hasOwnProperty.call(nextDeps, packageName)) {
      nextDeps[packageName] = packageVersion;
    }
  });

  return nextDeps;
}

function patchSmokeTestPackage(packagesPath: string, packagesForReact: Record<string, string>, reactVersion: string) {
  const pathToConfig = resolve(packagesPath, 'react-ui-smoke-test', 'cra-template-react-ui', 'template.json');
  const packageConfig = getJsonFile(pathToConfig);
  // Keep the smoke template's dependency list intact — react + @types/react only.
  const smokeAllowed = new Set(['react', 'react-dom', '@types/react', '@types/react-dom']);
  const filtered = Object.fromEntries(Object.entries(packagesForReact).filter(([k]) => smokeAllowed.has(k)));
  packageConfig.package.dependencies = { ...packageConfig.package.dependencies, ...filtered };
  writeJsonFile(pathToConfig, packageConfig);
  console.log(pathToConfig, 'patched');

  // NOTE: We intentionally do NOT switch the smoke test's index.tsx between
  // createRoot (R18+) and render (R16/17).  The legacy ReactDOM.render() API
  // still works in all React versions (deprecated in 18+, but functional) and
  // the smoke test's job is to verify that components mount without runtime
  // errors, not to test the render entry-point.  Switching to createRoot on R19
  // triggers timing-related issues in components that rely on render-time side
  // effects (e.g. HideBodyVerticalScroll setting globalObject in a Consumer
  // callback), so keeping the legacy API is the safer choice.
}

function printManifestReactVersion(packagesPath: string, expectedReactVersion?: string) {
  const pathToReactUi = resolve(packagesPath, 'react-ui', 'package.json');
  const pathToReactUiValidations = resolve(packagesPath, 'react-ui-validations', 'package.json');

  const reactUiVersion = getReactVersion(getJsonFile(pathToReactUi));
  const validationsVersion = getReactVersion(getJsonFile(pathToReactUiValidations));

  const reactUiMajor = getMajor(reactUiVersion);
  const validationsMajor = getMajor(validationsVersion);

  if (expectedReactVersion) {
    if (reactUiMajor === expectedReactVersion && validationsMajor === expectedReactVersion) {
      console.log(`[debug]: package manifests patched for REACT_VERSION=${expectedReactVersion}`);
    } else {
      console.log(
        `[debug]: package manifest mismatch. expected=${expectedReactVersion}, react-ui=${reactUiVersion}, validations=${validationsVersion}`,
      );
    }
    return;
  }

  console.log(`[debug]: package manifest react version is ${reactUiVersion}`);
}

interface PackageJsonWithReactDeps {
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

function getReactVersion(packageJson: PackageJsonWithReactDeps): string {
  return (
    packageJson?.devDependencies?.react ??
    packageJson?.dependencies?.react ??
    packageJson?.peerDependencies?.react ??
    'unknown'
  );
}

function getMajor(version: string): string | undefined {
  return version.match(/\d+/)?.[0];
}

function getJsonFile(path: string) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJsonFile(path: string, content: unknown) {
  writeFileSync(path, JSON.stringify(content, null, 2) + '\n');
}

function formatPatchedFiles() {
  const formatterPath = resolve(repoRoot, 'node_modules', '.bin', 'oxfmt');
  const filesToFormat = PATCHED_FILES.map((parts) => resolve(repoRoot, ...parts)).filter((path) => existsSync(path));

  if (!existsSync(formatterPath) || filesToFormat.length === 0) {
    return;
  }

  const result = spawnSync(formatterPath, filesToFormat, { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`[set-testing-package-versions] failed to format patched files with oxfmt (exit ${result.status})`);
  }
}

if (shouldReset) {
  restoreBackups();
} else {
  patchPackages(reactVersion, tsVersion);
}
