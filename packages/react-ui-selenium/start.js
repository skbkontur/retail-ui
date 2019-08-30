const { spawn } = require('child_process');

function promisifyProcess(child) {
  return new Promise((resolve, reject) => {
    let errorAcquired = false;
    child.on('error', error => {
      errorAcquired = true;
      reject(error);
    });
    child.on('exit', code => {
      if (errorAcquired) {
        return;
      }
      if (code) {
        reject(new Error(`Command failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

function exec(commandLine, { detached = false } = {}) {
  const [command, ...args] = commandLine.split(' ');
  const child = spawn(command, args, {
    shell: true,
    detached,
    stdio: [0, 1, 2],
    env: {
      NODE_ENV: 'production',
      ...process.env,
    },
  });

  return child;
}

function runStorybook() {
  const storybook = exec(`yarn workspace retail-ui storybook:test`, {
    detached: true,
  });
  const waitOnDefault = exec(`yarn wait-on -t 300000 http-get://localhost:6060/`);
  const waitOnFlat = exec(`yarn wait-on -t 300000 http-get://localhost:6061/`);

  storybook.on('error', error => {
    console.log(error);
    process.exit(-1);
  });

  childPids.push(storybook.pid);

  return [promisifyProcess(waitOnDefault), promisifyProcess(waitOnFlat)];
}

function killChildren() {
  childPids.forEach(pid => {
    try {
      process.kill(-pid);
    } catch (_) {}
  });
  childPids.length = 0;
}

const childPids = [];

process.on('exit', killChildren);
process.on('SIGINT', killChildren);

Promise.all(runStorybook())
  .then(() => {
    const creevey = exec(`yarn creevey ${process.argv.slice(2).join(' ')}`);

    return promisifyProcess(creevey);
  })
  .then(() => process.exit())
  .catch(error => {
    console.log(error);
    process.exit(-1);
  });
