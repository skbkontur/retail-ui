using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    [TestPageAction("Base1PageBase")]
    public class Base1PageBase : Base2PageBase, IPageInterface1
    {
        public Base1PageBase(IWebDriver webDriver)
            : base(webDriver)
        {
        }
    }
}