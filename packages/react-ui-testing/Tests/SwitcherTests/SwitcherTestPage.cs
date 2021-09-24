using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.SwitcherTests
{
    [AutoFillControls]
    public class SwitcherTestPage : PageBase
    {
        public SwitcherTestPage(IWebDriver webDriver) : base(webDriver)
        {
        }

        public Switcher NormalSwitcher { get; private set; }
        public Switcher NormalSwitcherWithValue { get; private set; }
        public Switcher DisabledSwitcher { get; private set; }
        public Switcher DisabledSwitcherWithValue { get; private set; }
        public Switcher SwitcherWithError { get; private set; }
    }
}
