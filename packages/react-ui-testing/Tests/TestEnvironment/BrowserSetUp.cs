using System.IO;
using System.Net;
using System;
using DotNetEnv;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class BrowserSetUp
    {
        public static void SetUp(string tunnelIdentifier)
        {
            var httpResponse = WebRequest.CreateHttp("https://fake.testkontur.ru/ip");
            var lanIP = new StreamReader(httpResponse.GetResponse().GetResponseStream()).ReadToEnd();
            var gitlabCIContainerIP = Env.GetString("CONTAINER_IP");
            var hostIP = gitlabCIContainerIP ?? lanIP;

            Console.WriteLine($"The host IP is '{hostIP}'. The LAN IP is '{lanIP}'. The GitLab CI container IP is '{gitlabCIContainerIP}'");

            browser = new Browser(hostIP, "8083", tunnelIdentifier);
        }

        public static void TearDown()
        {
            browser.Dispose();
            browser = null;
        }

        public static Browser browser;
    }
}
