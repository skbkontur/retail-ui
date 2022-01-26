using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class ComboBoxAssertions : ControlBaseAssertions<ComboBox, ComboBoxAssertions>
    {
        public ComboBoxAssertions(IAssertable<ComboBox> subject)
            : base(subject)
        {
        }

        public PropertyControlContext<ComboBox, string> Text { get { return HaveProperty(x => x.Text.Get(), "текст"); } }
    }
}