using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ExposeTidToDomTests
{
    [AutoFillControls]
    public class ExposeTidToDomTestPage : PageBase
    {
        public ExposeTidToDomTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public SameDomElementCase SameDomElementCase { get; private set; }
        public SameDomElementCase SameDomElementWithKeyCase { get; private set; }
        public SameDomElementCase ChangeDataTidCase { get; private set; }
        public NestingComponentsCase NestingComponentsCase { get; private set; }
        public NestingDomElementsCase NestingDomElementsCase { get; private set; }
        public DoubleNestingComponentsCase DoubleNestingComponentsCase { get; private set; }
        public SimpleTable SimpleTable { get; set; }
        public Label DivInsideParagraph { get; set; }
        public PropsFilteringCase PropsFilteringCase { get; set; }
    }

    [AutoFillControls]
    public class PropsFilteringCase : CompoundControl
    {
        public PropsFilteringCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label Component1 { get; private set; }
        public Label Component2 { get; private set; }
    }

    [AutoFillControls]
    public class SimpleTable : CompoundControl
    {
        public SimpleTable(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label Header1 { get; private set; }
        public Label Header2 { get; private set; }
        public Label Footer1 { get; private set; }
        public Label Footer2 { get; private set; }

        [ChildSelector("##Row")]
        public ControlList<Row> Rows { get; private set; }
    }

    [AutoFillControls]
    public class Row : CompoundControl
    {
        public Row(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label Cell1 { get; private set; }
        public Label Cell2 { get; private set; }
    }

    [AutoFillControls]
    public class NestingComponentsCase : CompoundControl
    {
        public NestingComponentsCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label NestingComponentsContainer { get; private set; }
        public Button SwitchState { get; private set; }
    }

    [AutoFillControls]
    public class DoubleNestingComponentsCase : CompoundControl
    {
        public DoubleNestingComponentsCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label DoubleNestingContainer { get; private set; }

        [Selector("NestingContainer")]
        public Label NestingContainer { get; private set; }

        [Selector("NestedComp1")]
        public Label NestedComp1 { get; private set; }

        [Selector("NestedComp2")]
        public Label NestedComp2 { get; private set; }

        public Button SwitchState { get; private set; }
    }

    [AutoFillControls]
    public class NestingDomElementsCase : CompoundControl
    {
        public NestingDomElementsCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label NestingDomContainer { get; private set; }
        public Button SwitchState { get; private set; }
    }

    [AutoFillControls]
    public class SameDomElementCase : CompoundControl
    {
        public SameDomElementCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public Label State1 { get; private set; }
        public Label State2 { get; private set; }
        public Button SwitchState { get; private set; }
    }
}