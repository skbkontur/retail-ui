using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    [TestPageAction("Root")]
    public class PageActionAttributeTestPage : Base1PageBase, IPageInterface
    {
        public PageActionAttributeTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }
    }
}