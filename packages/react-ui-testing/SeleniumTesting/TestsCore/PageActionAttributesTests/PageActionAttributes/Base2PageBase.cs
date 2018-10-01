using OpenQA.Selenium.Remote;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    [TestPageAction("Base2PageBase")]
    public class Base2PageBase : PageBase, IPageInterface2
    {
        public Base2PageBase(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }
    }
}