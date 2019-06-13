const { spawnSync } = require('child_process');

const getCurrentBranch = () => {
  const { error, stdout } = spawnSync('git rev-parse --abbrev-ref HEAD', [], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }

  return stdout.toString().trim();
};

const getRevisionTags = (pattern = '*') => {
  const { stderr, stdout } = spawnSync(`git tag -l ${pattern} --points-at HEAD`, [], { shell: true });

  if (stderr) {
    console.log(stderr.toString());
  }

  const tags = stdout.toString().trim();

  return tags ? tags.split('\n') : [];
};

const getRevisionHash = () => {
  const { error, stdout } = spawnSync('git rev-parse HEAD', [], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }

  return stdout.toString().trim();
};

module.exports = {
  getCurrentBranch,
  getRevisionHash,
  getRevisionTags,
};
