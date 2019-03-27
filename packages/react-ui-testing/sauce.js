require('dotenv').config();
const sauceConnectLauncher = require('sauce-connect-launcher');
let sauce;

sauceConnectLauncher(
  {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    tunnelIdentifier: process.argv[2],
    verbose: true,
    connectRetries: 1,
    connectRetryTimeout: 30000,
  },
  (error, sauceConnectProcess) => {
    if (error) {
      throw error;
    }
    sauce = sauceConnectProcess;
    console.log('Sauce Connect ready');
  },
);

process.stdin.on('data', () => {
  if (sauce) {
    sauce.close(function() {
      console.log('Closed Sauce Connect process');
      process.exit();
    });
  } else {
    process.exit();
  }
});
