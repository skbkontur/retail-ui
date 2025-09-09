const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const PACKAGE_JSON = path.join(__dirname, '../../../package.json');

const run = (cmd) => {
  return execSync(cmd, { shell: true });
};

const checkoutFiles = () => {
  const PATHS = [
    '.teamcity/',
    'packages/retail-ui/scripts/publish/',
    'packages/retail-ui/scripts/package/',
    'packages/retail-ui/scripts/git/',
    'packages/retail-ui/scripts/build/',
    '.gitignore',
    'packages/retail-ui/.gitignore',
  ];

  try {
    run(`git checkout origin/master ${PATHS.join(' ')}`);
  } catch (e) {
    if (!PATHS.every((p) => fs.existsSync(p))) {
      console.log('Critical files are missing.');
      process.exit(1);
    }
  }
};

const addDependencies = () => {
  run('yarn workspace retail-ui add rimraf semver fs-extra --dev');
};

const updatePackageJson = () => {
  const { loadConfig, updateConfig } = require('../../package');
  const config = loadConfig(PACKAGE_JSON);

  config.scripts = Object.assign({}, config.scripts, {
    prepublishOnly: 'yarn clean && node scripts/publish/prepublish && yarn build',
    clean: 'git clean -fdxqe node_modules',
    postpublish: 'yarn deploy && npm run publish:react-ui',
    'publish:react-ui': 'npm publish ./build',
  });

  delete config.scripts.postdeploy;

  updateConfig(config, PACKAGE_JSON);
};

const commitChanges = () => {
  run('git commit -anm "checkout scripts for the old-version release"');
};

checkoutFiles();
addDependencies();
updatePackageJson();
commitChanges();
