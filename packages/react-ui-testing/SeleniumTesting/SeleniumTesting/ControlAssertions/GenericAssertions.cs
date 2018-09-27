using SKBKontur.SeleniumTesting.Assertions.Bases;

namespace SKBKontur.SeleniumTesting
{
    public class GenericAssertions<T> : ControlBaseAssertions<T, GenericAssertions<T>> where T : ControlBase
    {
        public GenericAssertions(IAssertable<T> subject)
            : base(subject)
        {
        }
    }
}