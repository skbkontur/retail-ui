const { version } = require('./package.json');
const { spawnSync } = require('child_process');
const semver = require('semver');

const { error, stdout } = spawnSync('npm', ['show', 'retail-ui', '--json'], { shell: true });

if (error) {
  console.log(error);
  process.exit(-1);
}

const { versions, 'dist-tags': tags } = JSON.parse(stdout.toString());

const isLatest = version === tags.latest;
const isNext = semver.gt(version, tags.latest);
const isOldVersion = semver.lt(version, tags.latest);

module.exports = {
  version,
  isLatest,
  isNext,
  isOld,
};
