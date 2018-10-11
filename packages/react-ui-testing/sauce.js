require("dotenv").config();
const sauceConnectLauncher = require("sauce-connect-launcher");

sauceConnectLauncher(
  {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    tunnelIdentifier: process.argv[2]
  },
  (error, sauceConnectProcess) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Sauce Connect ready");
  }
);
