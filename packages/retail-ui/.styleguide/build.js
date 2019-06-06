const path = require('path');
const { spawnSync } = require('child_process');
const { copySync, removeSync, emptyDirSync } = require('fs-extra');
const { getPackageInfo, TAGS } = require('../scripts/package');
const { distTag, publishVersion } = getPackageInfo();
const { LATEST, LTS, UNSTABLE, OLD } = TAGS;
const { ROOT_DIR, VERSION_DIR } = require('./helpers');

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

const buildStyleguideRoot = () => {
  buildConfig(ROOT_CONFIG);
};

const buildStyleguideVersion = tag => {
  const BUILD_DIR = VERSION_DIR;
  const FINAL_DIR = {
    [LATEST]: path.join(ROOT_DIR, publishVersion),
    [LTS]: path.join(ROOT_DIR, 'lts'),
    [UNSTABLE]: path.join(ROOT_DIR, 'unstable', publishVersion),
    [OLD]: path.join(ROOT_DIR, publishVersion),
  };

  buildConfig(VERSION_CONFIG);

  if (BUILD_DIR !== FINAL_DIR[tag]) {
    copySync(BUILD_DIR, FINAL_DIR[tag], { overwrite: true });
    console.log(`Style guide copied to: ${FINAL_DIR[tag]}`);
  }

  if (tag === UNSTABLE) {
    removeSync(BUILD_DIR);
    console.log(`Style guide removed from: ${BUILD_DIR}`);
  }
};

buildStyleguideVersion(distTag);

if (distTag === LATEST) {
  buildStyleguideRoot();
}
