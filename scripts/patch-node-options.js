const child_process = require('child_process');

const majorVersionNode = process.versions.node.split('.')[0];
child_process.execSync(
  `${majorVersionNode > 16 ? 'cross-env NODE_OPTIONS=--openssl-legacy-provider' : ''} ${process.argv[2]}`,
  { stdio: 'inherit' },
);
