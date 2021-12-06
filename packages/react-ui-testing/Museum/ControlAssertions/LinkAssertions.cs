using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class LinkAssertions : ControlBaseAssertions<Link, LinkAssertions>
    {
        public LinkAssertions(IAssertable<Link> subject)
            : base(subject)
        {
        }

        public IAndContraint<LinkAssertions> BeDisabled()
        {
            HaveProperty(x => x.IsDisabled, "disabled").BeTrue();
            return AndThis();
        }

        public IAndContraint<LinkAssertions> BeEnabled()
        {
            HaveProperty(x => x.IsDisabled, "disabled").BeFalse();
            return AndThis();
        }

        public PropertyControlContext<Link, string> Text { get { return HaveComplexProperty(x => x.Text, "текст"); } }
    }
}