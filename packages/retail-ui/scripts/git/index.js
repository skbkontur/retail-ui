const { spawnSync } = require('child_process');

const getCurrentBranch = () => {
  const { error, stdout } = spawnSync('git rev-parse --abbrev-ref HEAD', [], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }

  return stdout.toString().trim();
};

const getRevisionHash = () => {
  const { error, stdout } = spawnSync('git rev-parse HEAD', [], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }

  return stdout.toString().trim();
};

const isTagExists = tag => {
  if (!tag) {
    return false;
  }

  const { error, stdout } = spawnSync(`git tag -l ${tag}`, [], { shell: true });

  if (error) {
    console.log(error);
    process.exit(-1);
  }

  return Boolean(stdout.toString().trim());
};

module.exports = {
  getCurrentBranch,
  getRevisionHash,
  isTagExists,
};
