const { execSync } = require('child_process');

const getCurrentBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD', { shell: true })
    .toString()
    .trim();
};

const getRevisionTags = (pattern = '*') => {
  const stdout = execSync(`git tag -l ${pattern} --points-at HEAD`, {
    shell: true,
  })
    .toString()
    .trim();

  return stdout ? stdout.split('\n') : [];
};

const getRevisionHash = () => {
  return execSync('git rev-parse HEAD', { shell: true })
    .toString()
    .trim();
};

module.exports = {
  getCurrentBranch,
  getRevisionHash,
  getRevisionTags,
};
