using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.RadioGroupTests
{
    [AutoFillControls]
    public class RadioGroupTestPage : PageBase
    {
        public RadioGroupTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public RadioGroup SimpleRadioGroup { get; private set; }
    }
}