using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.LinkTests
{
    [DefaultWaitInterval(2000)]
    public class LinkTest : TestBase
    {
        public LinkTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Link").GetPageAs<LinkTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleLink.IsPresent.Wait().True();
        }

        [Test]
        public void TestDisabled()
        {
                page.SimpleLink.IsDisabled.Wait().False();
                page.DisabledLink.IsDisabled.Wait().True();
        }

        [Test]
        public void TestTextWithoutIcon()
        {
                page.SimpleLink.Text.Wait().EqualTo("Simple link");
        }

        [Test]
        public void TestTextWithIcon()
        {
                page.IconicLink.Text.Wait().EqualTo("Iconic link");
        }

        [Test]
        public void TestComplextHtmlTextWithIcon()
        {
                page.IconicLinkComplex.Text.Wait().EqualTo("prefixtextsuffix");
        }

        private LinkTestPage page;
    }
}
