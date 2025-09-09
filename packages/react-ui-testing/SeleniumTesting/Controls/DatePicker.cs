using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls;

public class DatePicker : BaseDateInput
{
    public DatePicker(ISearchContainer container, ISelector selector)
        : base(container, selector)
    {
    }

    protected override IStrategy GetStrategy(IWebElement container)
    {
        var span = container.FindElement(By.CssSelector("label>span"));
        return new SpanInputStrategy(span);
    }
}
