using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.SwitcherTests
{
    [DefaultWaitInterval(2000)]
    public class SwitcherTest : TestBase
    {
        public SwitcherTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Switcher").GetPageAs<SwitcherTestPage>();
        }

        [Test]
        public void TestGetValue()
        {
            page.NormalSwitcher.Value.Wait().EqualTo(string.Empty);
            page.NormalSwitcherWithValue.Value.Wait().EqualTo(switcherValues[1].Value);
        }

        [Test]
        public void TestSetValue()
        {
            page.NormalSwitcher.SelectItemByName(switcherValues[0].Label);
            page.NormalSwitcher.Value.Wait().EqualTo(switcherValues[0].Value);
        }

        [Test]
        public void TestGetDisabled()
        {
            page.NormalSwitcher.IsDisabled.Wait().EqualTo(false);
            page.DisabledSwitcher.IsDisabled.Wait().EqualTo(true);
        }

        [Test]
        public void TestGetValueFromDisabled()
        {
            page.DisabledSwitcherWithValue.IsDisabled.Wait().EqualTo(true);
            page.DisabledSwitcherWithValue.Value.Wait().EqualTo(switcherValues[2].Value);
        }

        [Test]
        public void TestGetHasError()
        {
            page.NormalSwitcher.HasError.Wait().EqualTo(false);
            page.SwitcherWithError.HasError.Wait().EqualTo(true);
        }

        private SwitcherTestPage page;

        private readonly (string Value, string Label)[] switcherValues =
        {
            ("Left", "Налево"),
            ("Forward", "Прямо"),
            ("Right", "Направо")
        };
    }
}
