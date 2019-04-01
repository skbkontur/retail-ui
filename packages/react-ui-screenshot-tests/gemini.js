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

function exec(commandLine, { detached = false, env = {} } = {}) {
  const [command, ...args] = commandLine.split(' ');
  const child = spawn(command, args, {
    shell: true,
    detached,
    stdio: [0, 1, 2],
    env: {
      NODE_ENV: 'production',
      enableReactTesting: true,
      ...process.env,
      ...env,
    },
  });

  return child;
}

function runStorybook({ env, port }) {
  const storybook = exec(`yarn workspace retail-ui storybook -p ${port}`, {
    env,
    detached: true,
  });
  const waitOn = exec(`yarn wait-on -t 300000 http-get://localhost:${port}/`);
  const waitOnPromise = promisifyProcess(waitOn);

  storybook.on('error', error => {
    console.log(error);
    process.exit(-1);
  });

  childPids.push(storybook.pid);

  return waitOnPromise;
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

runStorybook({ port: 6060 })
  .then(() => {
    const gemini = exec(`yarn gemini ${process.argv.slice(2).join(' ')}`);

    return promisifyProcess(gemini);
  })
  .then(() => process.exit())
  .catch(error => {
    console.log(error);
    process.exit(-1);
  });
