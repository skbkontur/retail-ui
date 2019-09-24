const { execSync } = require('child_process');

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
    .filter(str => str.includes(revId))
    .forEach(str => {
      const match = str.match(/refs\/(heads|tags)\/(.+)$/);
      if (match) {
        const [str, type, name] = match;
        refs[type].push(name.replace('^{}', ''));
      }
    });

  return refs;
};

const getRevisionID = () => {
  return execSync('git rev-parse HEAD', { shell: true })
    .toString()
    .trim();
};

module.exports = {
  getRevisionID,
  getRevisionRefs,
};
