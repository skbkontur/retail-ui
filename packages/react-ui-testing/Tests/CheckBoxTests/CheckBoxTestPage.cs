using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.CheckBoxTests
{
    [AutoFillControls]
    public class CheckBoxTestPage : PageBase
    {
        public CheckBoxTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Checkbox SimpleCheckbox { get; set; }
        public Checkbox CheckboxWithLabel { get; set; }
        public Checkbox CheckboxToDisable { get; set; }
        public Checkbox CheckboxWithDisabledState { get; set; }
    }
}