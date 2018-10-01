using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.TooltipTests
{
    [DefaultWaitInterval(2000)]
    public class TooltipTest : TestBase
    {
        public TooltipTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Tooltip").GetPageAs<TooltipTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.OpenTooltip.Click();
            page.SimpleTooltip.ExpectTo().BePresent();
        }

        private TooltipTestPage page;
    }
}