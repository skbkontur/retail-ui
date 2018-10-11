const exec = require("child_process").exec;
const path = require('path');
const nugetSource = "https://api.nuget.org/v3/index.json";
const apikey = process.env["NUGET_API_KEY"];

exec(
    `nuget push Kontur.ReactUI.SeleniumTesting.*.nupkg -source ${nugetSource} -ApiKey ${apikey} -ForceEnglishOutput`,
    {cwd: path.join(__dirname, 'Output')},
    function(error, stdout, stderr) {
        if (
            error &&
            !error.message.includes(
                "status code does not indicate success: 409"
            )
        ) {
            throw error;
        }
        stdout && console.log(stdout);
        stderr && console.log(stderr);
    }
);
