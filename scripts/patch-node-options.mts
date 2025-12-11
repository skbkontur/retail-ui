import { execSync } from 'child_process';

const majorVersionNode = process.versions.node.split('.')[0];

if (Number(majorVersionNode) < 18) {
  throw new Error(`Please, update node, version must be >= 18. Your version is ${process.versions.node}.`);
}

execSync(`cross-env NODE_OPTIONS="--max_old_space_size=4096" ${process.argv[2]}`, { stdio: 'inherit' });
