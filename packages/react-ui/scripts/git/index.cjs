const { execSync } = require('child_process');

const getRevisionID = () => {
  return execSync('git rev-parse HEAD', { shell: true }).toString().trim();
};

const getRevisionRefs = (revId = getRevisionID()) => {
  const refs = {
    heads: [],
    tags: [],
  };

  execSync('git ls-remote --heads --tags origin', {
    shell: true,
  })
    .toString()
    .trim()
    .split('\n')
    .filter((str) => str.includes(revId))
    .forEach((str) => {
      const match = /refs\/(heads|tags)\/(.+)$/.exec(str);
      if (match) {
        const [, type, name] = match;
        refs[type].push(name.replace('^{}', ''));
      }
    });

  return refs;
};

module.exports = {
  getRevisionID,
  getRevisionRefs,
};
