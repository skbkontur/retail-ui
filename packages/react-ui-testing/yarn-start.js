const { exec } = require('child_process');
exec('yarn start', (error, stdout, stderr) => {
  error&&console.log(error);
  stdout&&console.log(stdout);
  stderr&&console.log(stderr);
});