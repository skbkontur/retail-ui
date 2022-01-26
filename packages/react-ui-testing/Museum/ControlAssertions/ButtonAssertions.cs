using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class ButtonAssertions : ControlBaseAssertions<Button, ButtonAssertions>
    {
        public ButtonAssertions(IAssertable<Button> button)
            : base(button)
        {
        }

        public PropertyControlContext<Button, string> Text { get { return HaveComplexProperty(x => x.Text.Get(), "text"); } }

        public IAndContraint<ButtonAssertions> BeDisabled()
        {
            HaveProperty(x => x.IsDisabled.Get(), "disabled").BeTrue();
            return AndThis();
        }

        public IAndContraint<ButtonAssertions> BeEnabled()
        {
            HaveProperty(x => x.IsDisabled.Get(), "disabled").BeFalse();
            return AndThis();
        }
    }
}