using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Toggle : ComponentBase
    {
        public Toggle(ISearchContainer container, ISelector selector)
            : this(container.ToSearchContext(), selector.SeleniumBy)
        {
        }

        public Toggle(ISearchContext container, By selector)
            : base(container, selector)
        {
        }

        public IProp<bool> IsChecked => Container.Attribute("data-prop-checked").Transform(bool.Parse);

        public IProp<bool> IsDisabled => Container.Attribute("data-prop-disabled").Transform(bool.Parse);
    }
}
