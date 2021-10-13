using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.RadioGroupTests
{
    [DefaultWaitInterval(2000)]
    public class RadioGroupTest : TestBase
    {
        public RadioGroupTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("RadioGroup").GetPageAs<RadioGroupTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleRadioGroup.IsPresent.Wait().True();
        }

        private RadioGroupTestPage page;
    }
}
