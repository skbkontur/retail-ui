using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.LinkTests
{
    [AutoFillControls]
    public class LinkTestPage : PageBase
    {
        public LinkTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Link SimpleLink { get; private set; }
        public Link DisabledLink { get; private set; }
        public Link IconicLink { get; private set; }
        public Link IconicLinkComplex { get; private set; }
    }
}