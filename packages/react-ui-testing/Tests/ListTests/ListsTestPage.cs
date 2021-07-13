using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ListTests
{
    [AutoFillControls]
    public class ListsTestPage : PageBase
    {
        public ListsTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        [ChildSelector("Input")]
        public ControlList<Input> InputWithoutTidList { get; set; }

        [ChildSelector("Input")]
        public ControlList<Input> NotExistentList { get; set; }

        [Selector("Case ##CompositeReadonlyElementList"), ChildSelector("##Item")]
        public ControlList<Item> CompositeReadonlyElementListCase { get; set; }

        public ControlsWithoutRootTid NoRootTidList { get; set; }
    }

    [AutoFillControls]
    public class ControlsWithoutRootTid : CompoundControl
    {
        public ControlsWithoutRootTid(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        [Selector("::local"), ChildSelector("##Item")]
        public ControlList<Item> RootWithoutTid { get; set; }
    }

    [AutoFillControls]
    public class Item : CompoundControl
    {
        public Item(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label Value1 { get; private set; }
        public Label Value2 { get; private set; }
        public Label NotExitingValue { get; private set; }
        public Label ExistsInSingleItem { get; private set; }
    }
}