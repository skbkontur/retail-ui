using System.Linq;
using Kontur.Selone.Elements;
using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using Kontur.Selone.Selectors.Css;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Switcher : ComponentBase
    {
        public Switcher(ISearchContainer container, ISelector selector) : this(container.ToSearchContext(),
            selector.SeleniumBy)
        {
        }

        public Switcher(ISearchContext searchContext, By @by) : base(searchContext, by)
        {
        }

        public IProp<bool> IsDisabled => Container.Attribute("data-prop-disabled").Transform(s => s == "true");
        public IProp<bool> HasError => Container.Attribute("data-prop-error").Transform(s => s == "true");
        public IProp<string> Value => Container.Attribute("data-prop-value");

        public ElementsCollection<Button> Buttons => //this.FindList().Of<Button>("Button").By("Group");
            new ElementsCollection<Button>(Container,
                x => x.Css("[data-comp-name~='Button']").FixedByIndex(),
                (c, s, e) => new Button(c, s));

        public void SelectItemByName(string name)
        {
            Buttons.First(x => x.Text.Get() == name).Click();
        }
    }
}
