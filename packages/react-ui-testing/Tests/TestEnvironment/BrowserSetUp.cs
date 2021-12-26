using System.IO;
using System.Net;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class BrowserSetUp
    {
        public static void SetUp(string tunnelIdentifier)
        {
            // var httpResponse = WebRequest.CreateHttp("http://fake.dev.kontur/ip");
            // var defaultDomain = new StreamReader(httpResponse.GetResponse().GetResponseStream()).ReadToEnd();

            browser = new Browser("localhost", "8083", tunnelIdentifier);
        }

        public static void TearDown()
        {
            browser.Dispose();
            browser = null;
        }

        public static Browser browser;
    }
}
