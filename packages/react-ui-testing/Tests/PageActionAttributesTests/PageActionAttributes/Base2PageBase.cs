using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    [TestPageAction("Base2PageBase")]
    public class Base2PageBase : PageBase, IPageInterface2
    {
        public Base2PageBase(IWebDriver webDriver)
            : base(webDriver)
        {
        }
    }
}