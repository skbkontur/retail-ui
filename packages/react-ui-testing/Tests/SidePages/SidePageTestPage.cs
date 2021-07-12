using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.SidePages
{
    [AutoFillControls]
    public class SidePageTestPage: PageBase
    {
        public SidePageTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button OpenStateless { get; set; }

        public TestSidePage StatelessSidePage { get; set; }

        public Button OpenStatefull { get; set; }

        public TestSidePage StatefullSidePage { get; set; }

        [AutoFillControls]
        public class TestSidePage : SidePageBase
        {
            public TestSidePage(ISearchContainer container, ISelector selector)
                : base(container, selector)
            {
            }

            [Selector("##Header")]
            public Label Header { get; set; }

            [Selector("##Content")]
            public Label Content { get; set; }

            [Selector("##Footer")]
            public Label Footer { get; set; }
        }
    }
}