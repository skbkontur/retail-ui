using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ButtonTests
{
    [AutoFillControls]
    public class ButtonTestPage : PageBase
    {
        public ButtonTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button SimpleButton { get; private set; }
    }
}