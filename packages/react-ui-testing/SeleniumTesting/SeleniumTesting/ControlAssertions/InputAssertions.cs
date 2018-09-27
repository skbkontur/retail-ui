using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class InputAssertions : ControlBaseAssertions<Input, InputAssertions>
    {
        public InputAssertions(IAssertable<Input> subject)
            : base(subject)
        {
        }

        public PropertyControlContext<Input, string> Value { get { return HaveProperty(x => x.Value.Get(), "value"); } }

        public IAndContraint<InputAssertions> BeDisabled()
        {
            HaveProperty(x => x.IsDisabled.Get(), "disabled").BeTrue();
            return AndThis();
        }

        public IAndContraint<InputAssertions> BeEnabled()
        {
            HaveProperty(x => x.IsDisabled.Get(), "disabled").BeFalse();
            return AndThis();
        }
    }
}