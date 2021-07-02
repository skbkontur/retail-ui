using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ButtonTests
{
    [AutoFillControls]
    public class ButtonTestPage : PageBase
    {
        public ButtonTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button SimpleButton { get; private set; }
        public Button WarningButton { get; private set; }
    }
}