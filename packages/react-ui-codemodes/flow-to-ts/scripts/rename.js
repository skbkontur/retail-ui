const path = require('path');

const Renamer = require('easy-renamer');
const glob = require('glob');
const shell = require('shelljs');

const renamer = new Renamer({ destBase: path.join(__dirname, '..') });

const args = [...process.argv];
const targetDir = process.argv[process.argv.length - 1];
const dry = args.includes('-d');

renamer.matcher(targetDir + '/**/*.js', file => {
  return path.join(file.dirname, file.filename + '.tsx');
});

renamer.matcher(targetDir + '/**/*.jsx', file => {
  return path.join(file.dirname, file.filename + '.tsx');
});

glob(path.join(__dirname, '..', targetDir, '**/*'), (err, files) => {
  files.forEach(fp => {
    if (fp.endsWith('.json') || fp.endsWith('.ts') || fp.endsWith('.tsx') || fp.endsWith('.adapter.js')) {
      return;
    }
    let newName = renamer.rename(fp);
    if (fp === newName) {
      return;
    }
    console.log(fp);
    console.log(newName);
    if (!dry) {
      shell.mv(fp, newName);
    }
  });
});
