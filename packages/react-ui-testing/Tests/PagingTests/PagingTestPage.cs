using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.PagingTests
{
    [AutoFillControls]
    public class PagingTestPage : PageBase
    {
        public PagingTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Paging Paging1 { get; private set; }
        public Paging Paging7 { get; private set; }
        public Paging Paging8 { get; private set; }
        public Paging Paging20 { get; private set; }
    }
}