using NUnit.Framework;

using SKBKontur.SeleniumTesting;

namespace SKBKontur.ValidationTests
{
    [SetUpFixture]
    public class BrowserSetUpFixture
    {
        [SetUp]
        public void SetUp()
        {
            browser = new Browser("localhost", "8081");
        }

        [TearDown]
        public void TearDown()
        {
            browser.Close();
            browser = null;
        }

        public static Browser browser;
    }
}