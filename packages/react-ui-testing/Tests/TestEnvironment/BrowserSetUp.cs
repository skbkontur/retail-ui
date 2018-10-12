namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class BrowserSetUp
    {
        public static void SetUp()
        {
            browser = new Browser("localhost", "8083");
        }

        public static void TearDown()
        {
            browser.Dispose();
            browser = null;
        }

        public static Browser browser;
    }
}