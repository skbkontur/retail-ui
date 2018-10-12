using OpenQA.Selenium.Remote;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    [TestPageAction("Root")]
    public class PageActionAttributeTestPage : Base1PageBase, IPageInterface
    {
        public PageActionAttributeTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }
    }
}