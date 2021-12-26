using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Checkbox : ComponentBase
    {
        public Checkbox(ISearchContainer container, ISelector selector)
            : this(container.ToSearchContext(), selector.SeleniumBy)
        {
        }

        public Checkbox(ISearchContext searchContext, By @by)
            : base(searchContext, @by)
        {
            Label = new Label(Container, new UniversalSelector("*:first-child + * + *").SeleniumBy);
        }

        public Label Label { get; private set; }

        public IProp<bool> IsChecked => Container.Attribute("data-prop-checked").Transform(bool.Parse);

        public IProp<bool> IsDisabled => Container.Attribute("data-prop-disabled").Transform(s => s == "true");
    }
}
