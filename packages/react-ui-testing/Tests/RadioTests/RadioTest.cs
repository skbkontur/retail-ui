using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
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
            IgnoreIfReactVersionSatisfies(">16.0.0", "в  react v16 поменялся механизм рендеринга, поэтому не корректно работает прокидывание data-tid в верстку");
            page.SimpleRadio.IsPresent.Wait().True();
        }

        private RadioTestPage page;
    }
}
