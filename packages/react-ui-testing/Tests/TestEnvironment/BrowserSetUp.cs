namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class BrowserSetUp
    {
        public static void SetUp(string tunnelIdentifier)
        {
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
