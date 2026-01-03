import { execSync } from 'child_process';

const [majorVersionNode, minorVersionNode] = process.versions.node.split('.');

if (Number(majorVersionNode) < 22 && Number(minorVersionNode) < 18) {
  throw new Error(`Please, update node, version must be >= 22.18. Your version is ${process.versions.node}.`);
}

execSync(`cross-env NODE_OPTIONS="--max_old_space_size=4096" ${process.argv[2]}`, {
  stdio: 'inherit',
});
