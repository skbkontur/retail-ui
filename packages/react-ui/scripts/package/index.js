const path = require('path');
const { execSync } = require('child_process');

const { eq, gt, gte, valid, diff } = require('semver');
const { readJsonSync, writeJsonSync } = require('fs-extra');

const { getRevisionID, getRevisionRefs } = require('../git');

const log = (message) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(message);
  }
};

const TAGS = {
  UNSTABLE: 'unstable',
  LATEST: 'latest',
  OLD: 'old-version',
  LTS: 'lts',
};
const PACKAGE_JSON = path.join(__dirname, '../../package.json');

const loadConfig = (path = PACKAGE_JSON) => {
  return readJsonSync(path);
};

const updateConfig = (config, path = PACKAGE_JSON) => {
  if (config) {
    writeJsonSync(path, config, { spaces: 2 });
  }
  return config;
};

const fetchPackageData = (packageName) => {
  let npmData = null;

  try {
    npmData = execSync(`npm show ${packageName} --json`, {
      shell: true,
    })
      .toString()
      .trim();
  } catch (e) {
    console.log(e);
  }

  const { versions: npmVersions = [], 'dist-tags': npmTags = {} } = npmData ? JSON.parse(npmData) : {};

  return {
    npmVersions,
    npmTags,
  };
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

const getReleaseTagName = (version) => {
  return `@skbkontur/react-ui@${version}`;
};

const getDistTag = (version, npmTags, revBranches, revTags) => {
  const { LATEST, UNSTABLE, OLD, LTS } = TAGS;

  if (!valid(version)) {
    log(`Invalid package version: ${version}`);
    return null;
  }

  const hasMasterBranch = revBranches.includes('master');
  const hasLTSBranch = revBranches.includes('lts');
  const hasReleaseTag = revTags.includes(getReleaseTagName(version));

  log(`Getting dist-tag:
    version: ${version}
    npmTags: ${JSON.stringify(npmTags)}
    rev: ${getRevisionID()}
    revBranches: [${revBranches}]
    revTags: [${revTags}]
  `);

  if (!hasReleaseTag) {
    return UNSTABLE;
  }

  if (hasMasterBranch) {
    if (!valid(npmTags.latest)) {
      log(`The version pointed to by the "latest" tag is invalid: ${npmTags.latest}.`);
      return null;
    }
    if (gte(version, npmTags.latest)) {
      return LATEST;
    }
    log(
      `Current version does not meet the "latest-version" requirements (see #1423). Current: ${version}, Latest: ${npmTags.latest}.`,
    );
    return null;
  }

  if (hasLTSBranch) {
    if (!valid(npmTags.lts)) {
      log(`The version pointed to by the "lts" tag is invalid: ${npmTags.lts}.`);
      return null;
    }
    if (eq(version, npmTags.lts) || (gt(version, npmTags.lts) && diff(version, npmTags.lts) === 'patch')) {
      return LTS;
    }
    log(
      `Current version does not meet the "lts-version" requirements (see #1423). Current: ${version}, LTS: ${npmTags.lts}.`,
    );
    return null;
  }

  return OLD;
};

const getPackageInfo = (configPath = PACKAGE_JSON) => {
  const config = loadConfig(configPath);

  const { npmVersions, npmTags } = fetchPackageData(config.name);
  const { heads: revBranches, tags: revTags } = getRevisionRefs();
  const distTag = getDistTag(config.version, npmTags, revBranches, revTags);

  if (!distTag) {
    log('Failed to determine the dist-tag.');
    process.exit(-1);
  }

  const publishVersion = getPublishVersion(distTag, config.version, getRevisionID());
  const homepage = getHomepage(distTag, publishVersion);

  return {
    publishVersion,
    npmVersions,
    npmTags,
    distTag,
    homepage,
    config,
  };
};

module.exports = {
  getPackageInfo,
  loadConfig,
  updateConfig,
  getDistTag,
  TAGS,
};
