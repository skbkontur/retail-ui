using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.TooltipTests
{
    [AutoFillControls]
    public class TooltipTestPage : PageBase
    {
        public TooltipTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button OpenTooltip { get; private set; }
        public Tooltip SimpleTooltip { get; private set; }
    }
}