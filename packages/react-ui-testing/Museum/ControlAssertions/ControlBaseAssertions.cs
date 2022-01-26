using SKBKontur.SeleniumTesting.Assertions.Bases;

namespace SKBKontur.SeleniumTesting
{
    public class ControlBaseAssertions : ControlBaseAssertions<ControlBase, ControlBaseAssertions>
    {
        public ControlBaseAssertions(IAssertable<ControlBase> subject)
            : base(subject)
        {
        }
    }
}