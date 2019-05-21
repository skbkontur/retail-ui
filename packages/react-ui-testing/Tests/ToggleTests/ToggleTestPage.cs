using OpenQA.Selenium.Remote;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ToggleTests
{
    [AutoFillControls]
    public class ToggleTestPage : PageBase
    {
        public ToggleTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Toggle SimpleToggle { get; set; }

        public Toggle DisablingToggle { get; set; }

        public Checkbox DisablingCheckbox { get; set; }
    }
}
