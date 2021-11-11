using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class CompoundControlAssertions<T> : ControlBaseAssertions<T, CompoundControlAssertions<T>> where T : CompoundControl
    {
        public CompoundControlAssertions(IAssertable<T> subject)
            : base(subject)
        {
        }

        public PropertyControlContext<T, string> Text { get { return HaveComplexProperty(x => x.Text.Get(), "текст"); } }
    }
}