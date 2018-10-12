using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class TextAreaAssertions : ControlBaseAssertions<TextArea, TextAreaAssertions>
    {
        public TextAreaAssertions(IAssertable<TextArea> subject)
            : base(subject)
        {
        }

        public PropertyControlContext<TextArea, string> Value { get { return HaveProperty(x => x.Value, "value"); } }

        public IAndContraint<TextAreaAssertions> BeDisabled()
        {
            HaveProperty(x => x.IsDisabled, "disabled").BeTrue();
            return AndThis();
        }

        public IAndContraint<TextAreaAssertions> BeEnabled()
        {
            HaveProperty(x => x.IsDisabled, "disabled").BeFalse();
            return AndThis();
        }
    }
}