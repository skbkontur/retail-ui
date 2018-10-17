require("dotenv").config();
const sauceConnectLauncher = require("sauce-connect-launcher");

sauceConnectLauncher(
  {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    tunnelIdentifier: process.argv[2],
	verbose:true,
	connectRetries:1,
	connectRetryTimeout:30000
  },
  (error, sauceConnectProcess) => {
    if (error) {
      throw error;
    }
    console.log("Sauce Connect ready");
  }
);
