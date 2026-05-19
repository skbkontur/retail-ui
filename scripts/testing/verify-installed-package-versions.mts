import { existsSync, readFileSync, readdirSync } from 'fs';
import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..', '..');

const expectedReactVersion = process?.env?.REACT_VERSION;
const expectedTypescriptVersion = process?.env?.TYPESCRIPT_VERSION;

const workspaceConfigs = [
  {
    name: 'react-ui',
    packageJsonPath: resolve(repoRoot, 'packages', 'react-ui', 'package.json'),
    packages: [
      'react',
      'react-dom',
      '@types/react',
      '@types/react-dom',
      '@testing-library/react',
      '@testing-library/dom',
    ],
  },
  {
    name: 'react-ui-validations',
    packageJsonPath: resolve(repoRoot, 'packages', 'react-ui-validations', 'package.json'),
    packages: [
      'react',
      'react-dom',
      '@types/react',
      '@types/react-dom',
      '@testing-library/react',
      '@testing-library/dom',
    ],
  },
] as const;

const expectedPackagesByReactVersion = getJsonFile(resolve(__dirname, 'package-versions.json')).react as Record<
  string,
  Record<string, string>
>;

function main() {
  const installedVersions = workspaceConfigs.map(getInstalledWorkspaceVersions);
  let hasMismatch = false;

  for (const workspace of installedVersions) {
    console.log(
      `[debug]: installed packages for ${workspace.name}: ${formatPackageVersions(workspace.packages)}; runtime=${formatRuntimeVersions(
        workspace.runtime,
      )}`,
    );
  }

  for (const packageName of [
    'react',
    'react-dom',
    '@types/react',
    '@types/react-dom',
    '@testing-library/react',
    '@testing-library/dom',
  ]) {
    const versions = installedVersions
      .map((workspace) => workspace.packages[packageName]?.version)
      .filter((version): version is string => version !== undefined);
    const uniqueVersions = [...new Set(versions)];

    if (uniqueVersions.length > 1) {
      console.error(
        `[debug]: installed package mismatch for ${packageName}: ${installedVersions
          .map((workspace) => `${workspace.name}=${workspace.packages[packageName]?.version ?? 'missing'}`)
          .join(', ')}`,
      );
      hasMismatch = true;
    }
  }

  for (const packageName of ['react', 'react-dom'] as const) {
    const copies = findRuntimePackageCopies(packageName);
    console.log(
      `[debug]: installed runtime copies for ${packageName}: ${copies.length > 0 ? copies.join(', ') : 'missing'}`,
    );

    if (copies.length !== 1) {
      console.error(
        `[debug]: expected exactly one installed runtime copy for ${packageName}, found ${copies.length}: ${
          copies.length > 0 ? copies.join(', ') : 'missing'
        }`,
      );
      hasMismatch = true;
    }
  }

  if (expectedReactVersion) {
    const expectedPackages = expectedPackagesByReactVersion[expectedReactVersion];
    if (!expectedPackages) {
      console.error(
        `[debug]: cannot verify installed packages for REACT_VERSION=${expectedReactVersion}. Supported values: ${Object.keys(
          expectedPackagesByReactVersion,
        ).join(', ')}`,
      );
      process.exit(1);
    }

    for (const workspace of installedVersions) {
      for (const [packageName, expectedVersion] of Object.entries(expectedPackages)) {
        const installedVersion = workspace.packages[packageName]?.version;
        if (getMajor(installedVersion) !== getMajor(expectedVersion)) {
          console.error(
            `[debug]: installed package mismatch in ${workspace.name}: ${packageName} expected=${expectedVersion}, installed=${
              installedVersion ?? 'missing'
            }`,
          );
          hasMismatch = true;
        }
      }
    }
  }

  const installedTypescriptVersion = resolveInstalledPackage('typescript', resolve(repoRoot, 'package.json')).version;
  console.log(`[debug]: installed toolchain versions: typescript=${installedTypescriptVersion ?? 'missing'}`);
  if (expectedTypescriptVersion && getMajor(installedTypescriptVersion) !== getMajor(expectedTypescriptVersion)) {
    console.error(
      `[debug]: installed package mismatch for typescript: expected=${expectedTypescriptVersion}, installed=${
        installedTypescriptVersion ?? 'missing'
      }`,
    );
    hasMismatch = true;
  }

  if (hasMismatch) {
    process.exit(1);
  }
}

function getInstalledWorkspaceVersions(workspace: (typeof workspaceConfigs)[number]) {
  return {
    name: workspace.name,
    packages: Object.fromEntries(
      workspace.packages.map((packageName) => [
        packageName,
        resolveInstalledPackage(packageName, workspace.packageJsonPath),
      ]),
    ) as Record<string, ResolvedPackage>,
    runtime: getRuntimeVersions(workspace.packageJsonPath),
  };
}

interface ResolvedPackage {
  path?: string;
  version?: string;
}

function resolveInstalledPackage(packageName: string, packageJsonPath: string): ResolvedPackage {
  const requireFromWorkspace = createRequire(packageJsonPath);

  try {
    const resolvedPackageJsonPath = requireFromWorkspace.resolve(`${packageName}/package.json`);
    return {
      path: resolvedPackageJsonPath,
      version: getJsonFile(resolvedPackageJsonPath).version,
    };
  } catch {
    return {};
  }
}

function findRuntimePackageCopies(packageName: 'react' | 'react-dom') {
  const nodeModulesRoot = resolve(repoRoot, 'node_modules');
  if (!existsSync(nodeModulesRoot)) {
    return [];
  }

  const copies = new Set<string>();
  const queue = [nodeModulesRoot];

  while (queue.length > 0) {
    const currentNodeModulesPath = queue.shift()!;
    const packagePath = resolve(currentNodeModulesPath, packageName);
    const packageJsonPath = resolve(packagePath, 'package.json');
    if (existsSync(packageJsonPath)) {
      copies.add(packagePath);
    }

    for (const packageDir of readPackageDirectories(currentNodeModulesPath)) {
      const nestedNodeModules = resolve(packageDir, 'node_modules');
      if (existsSync(nestedNodeModules)) {
        queue.push(nestedNodeModules);
      }
    }
  }

  return [...copies].sort();
}

function readPackageDirectories(nodeModulesPath: string) {
  const packageDirs: string[] = [];

  for (const entry of readdirSync(nodeModulesPath, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '.cache') {
      continue;
    }

    if (entry.name.startsWith('@')) {
      for (const scopedEntry of readdirSync(resolve(nodeModulesPath, entry.name), { withFileTypes: true })) {
        if (scopedEntry.isDirectory()) {
          packageDirs.push(resolve(nodeModulesPath, entry.name, scopedEntry.name));
        }
      }
      continue;
    }

    packageDirs.push(resolve(nodeModulesPath, entry.name));
  }

  return packageDirs;
}

function getRuntimeVersions(packageJsonPath: string) {
  const requireFromWorkspace = createRequire(packageJsonPath);

  return {
    react: readRuntimeVersion(requireFromWorkspace, 'react'),
    'react-dom': readRuntimeVersion(requireFromWorkspace, 'react-dom'),
  };
}

function readRuntimeVersion(requireFromWorkspace: NodeJS.Require, packageName: 'react' | 'react-dom') {
  try {
    const packageModule = requireFromWorkspace(packageName) as { version?: string };
    return packageModule.version;
  } catch {
    return undefined;
  }
}

function formatPackageVersions(packages: Record<string, ResolvedPackage>) {
  return Object.entries(packages)
    .map(
      ([packageName, resolvedPackage]) =>
        `${packageName}=${resolvedPackage.version ?? 'missing'}@${resolvedPackage.path ?? 'unresolved'}`,
    )
    .join(', ');
}

function formatRuntimeVersions(runtimeVersions: Record<string, string | undefined>) {
  return Object.entries(runtimeVersions)
    .map(([packageName, version]) => `${packageName}=${version ?? 'missing'}`)
    .join(', ');
}

function getMajor(version: string | undefined) {
  return version?.match(/\d+/)?.[0];
}

function getJsonFile(path: string) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

main();
