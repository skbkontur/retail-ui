using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Label : ComponentBase
    {
        public Label(ISearchContainer container, ISelector selector)
            : this(container.ToSearchContext(), selector.SeleniumBy)
        {
        }

        public Label(ISearchContext searchContext, By @by) : base(searchContext, by)
        {
        }

        public IProp<string> Text => Container.Text();
    }
}
