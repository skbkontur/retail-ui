using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ModalTests
{
    [AutoFillControls]
    public class TestModal : ModalBase
    {
        public TestModal(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            Header = this.Find<Label>().By("ModalHeader");
        }

        public Label Content { get; private set; }

        [Selector("##Close")]
        public Button CloseButton { get; private set; }

        [SkipAutoFill]
        public Label Header { get; set; }
    }
}
