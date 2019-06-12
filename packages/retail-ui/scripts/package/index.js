const path = require('path');
const { spawnSync } = require('child_process');
const { eq, gt, gte, valid, diff } = require('semver');
const { getCurrentBranch, getRevisionHash, isTagExists } = require('../git');
const { readJsonSync, writeJsonSync } = require('fs-extra');

const TAGS = {
  UNSTABLE: 'unstable',
  LATEST: 'latest',
  OLD: 'old-version',
  LTS: 'lts',
};
const PACKAGE_JSON = path.join(__dirname, '../../package.json');

const getPackageInfo = (configPath = PACKAGE_JSON) => {
  const config = loadConfig(configPath);

  const { npmVersions, npmTags } = fetchPackageData(config.name);

  const gitTag = getGitTag(config.version);
  const distTag = getDistTag(config.version, npmTags, getCurrentBranch(), isTagExists(gitTag));

  if (!distTag) {
    console.log('Failed to determine the dist-tag.');
    process.exit(-1);
  }

  const publishVersion = getPublishVersion(distTag, config.version, getRevisionHash());
  const homepage = getHomepage(distTag, publishVersion);

  return {
    publishVersion,
    npmVersions,
    distTag,
    homepage,
    config,
  };
};

const loadConfig = (path = PACKAGE_JSON) => {
  return readJsonSync(path);
};

const updateConfig = (config, path = PACKAGE_JSON) => {
  if (config) {
    writeJsonSync(path, config, { spaces: 2 });
  }
  return config;
};

const fetchPackageData = packageName => {
  const { error, stdout } = spawnSync('npm', ['show', packageName, '--json'], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }
  const { versions: npmVersions, 'dist-tags': npmTags } = JSON.parse(stdout.toString());

  return {
    npmVersions,
    npmTags,
  };
};

const getDistTag = (version, npmTags, gitBranch, isGitTagExists) => {
  const { LATEST, UNSTABLE, OLD, LTS } = TAGS;

  if (!valid(version)) {
    console.log(`Invalid package version: ${version}`);
    return null;
  }

  if (gitBranch && isGitTagExists) {
    switch (gitBranch) {
      case 'master':
        if (valid(npmTags.latest)) {
          if (gte(version, npmTags.latest)) {
            return LATEST;
          }
          console.log(
            `Current version does not meet the "latest-version" requirements (see #1423). Current: ${version}, Latest: ${
              npmTags.latest
            }.`,
          );
        } else {
          console.log(`The version pointed to by the "latest" tag is invalid: ${npmTags.latest}.`);
        }
        return null;
      case 'lts':
        if (valid(npmTags.lts)) {
          if (eq(version, npmTags.lts) || (gt(version, npmTags.lts) && diff(version, npmTags.lts) === 'patch')) {
            return LTS;
          }
          console.log(
            `Current version does not meet the "lts-version" requirements (see #1423). Current: ${version}, LTS: ${
              npmTags.lts
            }.`,
          );
        } else {
          console.log(`The version pointed to by the "lts" tag is invalid: ${npmTags.lts}.`);
        }
        return null;
      default:
        return OLD;
    }
  } else {
    return UNSTABLE;
  }
};

const getPublishVersion = (distTag, version, hash) => {
  return distTag !== TAGS.UNSTABLE ? version : `0.0.0-${hash.slice(0, 10)}`;
};

const getHomepage = (distTag, publishVersion) => {
  const HOMEPAGE = 'https://tech.skbkontur.ru/react-ui/';
  switch (distTag) {
    case TAGS.UNSTABLE:
      return `${HOMEPAGE}unstable/${publishVersion}/`;
    default:
      return `${HOMEPAGE}${publishVersion}/`;
  }
};

const getGitTag = version => {
  return `retail-ui@${version}`;
};

module.exports = {
  getPackageInfo,
  loadConfig,
  updateConfig,
  getDistTag,
  TAGS,
};
