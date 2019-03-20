using Kontur.Selone.Properties;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Button : ControlBase
    {
        public Button(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void ClickViaJavascript()
        {
            ExecuteAction(
                x => ExecuteScript("arguments[0].click();", x.FindElement(By.TagName("div"))),
                "ClickViaJavascript");
        }

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
        public IProp<string> Text => ValueFromElement(x => x.Text);
    }
}