using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class DateRangePickerInput : BaseDateInput
    {
        public DateRangePickerInput(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        protected override IStrategy GetStrategy(IWebElement container)
        {
            return new SpanInputStrategy(container);
        }
    }
}


