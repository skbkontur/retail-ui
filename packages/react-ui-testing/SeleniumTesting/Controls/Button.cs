using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Button : ComponentBase
    {
        public Button(ISearchContainer container, ISelector selector)
            : this(container.ToSearchContext(), selector.SeleniumBy)
        {
        }

        public Button(ISearchContext container, By selector)
            : base(container, selector)
        {
        }

        public void ClickViaJavascript()
        {
            Container.ExecuteJs("arguments[0].click();");
        }

        public IProp<bool> IsDisabled =>
            Container.Attribute("data-prop-disabled").Transform(s => s == "true"); //ReactProperty<bool>("disabled");

        public IProp<bool> HasWarning => Container.Attribute("data-prop-warning").Transform(s => s == "true");
    }
}
