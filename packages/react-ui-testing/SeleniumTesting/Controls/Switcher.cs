using System.Linq;
using JetBrains.Annotations;
using Kontur.RetryableAssertions.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Internals;
using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Switcher : ControlList<Button>
    {
        public Switcher([NotNull] ISearchContainer container, [NotNull] ISelector selector)
            : base(container, selector, new BySelector(By.CssSelector("[data-comp-name~='Button']")))
        {
        }

        public new IProp<bool> HasError => ReactProperty<bool>("error");
        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
        public IProp<string> Value => ReactProperty<string>("value");

        public void SelectItemByName(string name, Timings timings = null)
        {
            this.AsEnumerable().Wait().Single(x => x.Text.AssertEqualTo(name), timings.GetConfiguration()).Click();
        }
    }
}
