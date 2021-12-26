using Kontur.RetryableAssertions.Extensions;
using Kontur.Selone.Elements;
using Kontur.Selone.Properties;
using Kontur.Selone.Selectors.Css;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls.Base;
using SKBKontur.SeleniumTesting.Internals;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Paging : ComponentBase
    {
        public Paging(ISearchContainer container, ISelector selector)
            : this(container.ToSearchContext(), selector.SeleniumBy/*, new BySelector(By.CssSelector("[data-comp-name~='component']"))*/)
        {
        }

        public Paging(ISearchContext searchContext, By @by)
            : base(searchContext, @by/*, new BySelector(By.CssSelector("[data-comp-name~='component']"))*/)
        {
        }

        private ElementsCollection<Label> Items => new ElementsCollection<Label>(Container,
            x => x.Css("[data-comp-name~='component']").FixedByIndex(),
            (s, b, _) => new Label(s, b)
        );

        public void GoToPage(int page, Timings timings = null)
        {
            Items.Wait().Single(x => x.Text.AssertEqualTo(page.ToString()), timings.GetConfiguration()).Click();
        }

        public void GoToNextPage(Timings timings = null)
        {
            Items.Wait().Single(x => x.Text.AssertStartsWith("Дальше"), timings.GetConfiguration()).Click();
        }

        public IProp<int> ActivePage =>
            Prop.Create(() => int.Parse(Container.GetAttribute("data-prop-activepage")),
                "Paging.ActivePage"); //ReactProperty<int>("ActivePage");

        public IProp<int> PagesCount =>
            Prop.Create(() => int.Parse(Container.GetAttribute("data-prop-pagescount")),
                "Paging.PagesCount"); //ReactProperty<int>("PagesCount");
    }
}
