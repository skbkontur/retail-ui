using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ToggleTests
{
    public class ToggleTest : TestBase
    {
        public ToggleTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Toggle").GetPageAs<ToggleTestPage>();
        }

        [Test]
        public void TestPresentAndNotChecked()
        {
            page.SimpleToggle.IsPresent.Wait().That(Is.True);
            page.SimpleToggle.IsChecked.Wait().That(Is.False);
        }

        [Test]
        public void TestChangeChecked()
        {
            page.SimpleToggle.IsChecked.Wait().That(Is.False);
            page.SimpleToggle.Click();
            page.SimpleToggle.IsChecked.Wait().That(Is.True);
        }

        [Test]
        public void TestChangeDisabled()
        {
            page.DisablingToggle.IsDisabled.Wait().That(Is.False);
            page.DisablingCheckbox.Click();
            page.DisablingToggle.IsDisabled.Wait().That(Is.True);
        }

        [Test]
        public void TestCheckedNoChangeWhenDisabled()
        {
            page.DisablingToggle.IsChecked.Wait().That(Is.False);
            page.DisablingToggle.Click();
            page.DisablingToggle.IsChecked.Wait().That(Is.True);

            page.DisablingToggle.IsChecked.Wait().That(Is.True);
            page.DisablingCheckbox.Click();
            page.DisablingToggle.IsChecked.Wait().That(Is.True);

            page.DisablingCheckbox.Click();
            page.DisablingToggle.Click();

            page.DisablingToggle.IsChecked.Wait().That(Is.False);
            page.DisablingCheckbox.Click();
            page.DisablingToggle.IsChecked.Wait().That(Is.False);
        }

        private ToggleTestPage page;
    }
}
