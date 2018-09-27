using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ModalTests
{
    [AutoFillControls]
    public class ModalWithStatelessComponentWithShowPropsCase : CompoundControl
    {
        public ModalWithStatelessComponentWithShowPropsCase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public TestModal Modal { get; private set; }
        public Button Open { get; private set; }
    }
}