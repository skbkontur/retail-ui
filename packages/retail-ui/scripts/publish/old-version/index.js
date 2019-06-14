const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const PACKAGE_JSON = path.join(__dirname, '../../../package.json');

const run = cmd => {
  const output = execSync(cmd, [], { shell: true });
  console.log(output.toString());
};

const checkoutFiles = () => {
  const PATHS = [
    '.teamcity/',
    'packages/retail-ui/scripts/publish/',
    'packages/retail-ui/scripts/package/',
    'packages/retail-ui/scripts/git/',
    'packages/retail-ui/.styleguide/',
    '.gitignore',
    'packages/retail-ui/.gitignore',
  ];

  try {
    // TODO: replace with origin/master before merge
    run(`git checkout publish-tags ${PATHS.join(' ')}`);
  } catch (e) {
    if (!PATHS.every(p => fs.existsSync(p))) {
      console.log('Critical files are missing.');
      process.exit(1);
    }
  }
};

const addDependencies = () => {
  run('yarn workspace retail-ui add rimraf semver fs-extra --dev');
};

const updatePackageJson = () => {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON));
  const EOF = '\n';

  packageJson.scripts = Object.assign({}, packageJson.scripts, {
    prepublishOnly: 'yarn clean && node scripts/publish/prepublish && yarn build',
    clean: 'git clean -fdxqe node_modules',
    postpublish: 'yarn deploy && npm run publish:react-ui',
    predeploy: 'rimraf .styleguide/build && yarn run styleguide:build',
    deploy: 'gh-pages -a -d .styleguide/build -r git@github.com:skbkontur/react-ui.git',
    'publish:react-ui': 'npm publish ./build',
    'styleguide:build': 'node .styleguide/build',
  });

  delete packageJson.scripts.postdeploy;

  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + EOF);
};

const commitChanges = () => {
  run('git commit -anm "checkout scripts for the old-version release"');
};

checkoutFiles();
addDependencies();
updatePackageJson();
commitChanges();
