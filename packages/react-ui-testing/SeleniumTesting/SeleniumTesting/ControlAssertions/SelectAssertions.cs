using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class SelectAssertions : ControlBaseAssertions<Select, SelectAssertions>
    {
        public SelectAssertions(IAssertable<Select> subject)
            : base(subject)
        {
        }

        public PropertyControlContext<Select, string> SelectedValueText { get { return HaveProperty(x => x.SelectedValueText, "текст"); } }
    }
}