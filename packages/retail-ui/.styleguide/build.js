const path = require('path');
const { spawnSync } = require('child_process');
const { copySync, removeSync, emptyDirSync } = require('fs-extra');
const { getPackageInfo, TAGS } = require('../scripts/package');
const { distTag, publishVersion } = getPackageInfo();
const { LATEST, LTS, UNSTABLE, OLD } = TAGS;

const ROOT_CONFIG = path.join(__dirname, 'config/root.config.js');
const VERSION_CONFIG = path.join(__dirname, 'config/version.config.js');

const buildConfig = config => {
  const { stdout, stderr } = spawnSync('yarn styleguidist build', ['--config', config], {
    shell: true,
  });

  if (stderr) {
    console.log(stderr.toString());
  }

  console.log(stdout.toString());
};

buildConfig(VERSION_CONFIG);

if (distTag === LATEST) {
  buildConfig(ROOT_CONFIG);
}
