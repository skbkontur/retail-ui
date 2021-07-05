using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.DatePickerTests
{
    [AutoFillControls]
    public class DatePickerTestPage : PageBase
    {
        public DatePickerTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public DatePicker SimpleDatePicker { get; private set; }
        public DatePicker FilledDatePicker { get; private set; }
        public DatePicker DisabledDatePicker { get; private set; }
    }
}