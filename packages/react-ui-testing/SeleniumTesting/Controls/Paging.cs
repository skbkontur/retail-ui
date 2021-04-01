using System.Linq;

using Kontur.RetryableAssertions.Extensions;
using Kontur.Selone.Properties;

using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals;
using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Paging : ControlList<Label>
    {
        public Paging(ISearchContainer container, ISelector selector)
            : base(container, selector, new BySelector(By.CssSelector("[data-comp-name~='component']")))
        {
        }

        public void GoToPage(int page, Timings timings = null)
        {
            this.AsEnumerable().Wait().Single(x => x.Text.AssertEqualTo(page.ToString()), timings.GetConfiguration()).Click();
        }

        public void GoToNextPage(Timings timings = null)
        {
            this.AsEnumerable().Wait().Single(x => x.Text.AssertStartsWith("Дальше"), timings.GetConfiguration()).Click();
        }

        public IProp<int> ActivePage => ReactProperty<int>("ActivePage");
        public IProp<int> PagesCount => ReactProperty<int>("PagesCount");
    }
}
