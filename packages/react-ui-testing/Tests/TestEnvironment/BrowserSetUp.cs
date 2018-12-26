using System;
using System.IO;
using System.Net;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class BrowserSetUp
    {
        public static void SetUp(string tunnelIdentifier)
        {
            string defaultDomain;
            if (TravisEnvironment.IsExecutionViaTravis)
            {
                defaultDomain = "localhost";
            }
            else
            {
                var httpResponse = WebRequest.CreateHttp("http://fake.dev.kontur/ip");
                defaultDomain = new StreamReader(httpResponse.GetResponse().GetResponseStream()).ReadToEnd();
            }

            browser = new Browser(defaultDomain, "8083", tunnelIdentifier);
        }

        public static void TearDown()
        {
            browser.Dispose();
            browser = null;
        }

        public static Browser browser;
    }
}
