using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.RadioTests
{
    [DefaultWaitInterval(2000)]
    public class RadioTest : TestBase
    {
        public RadioTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Radio").GetPageAs<RadioTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleRadio.ExpectTo().BePresent();
        }

        private RadioTestPage page;
    }
}