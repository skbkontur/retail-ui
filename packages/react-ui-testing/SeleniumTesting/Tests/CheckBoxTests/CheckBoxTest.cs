using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.CheckBoxTests
{
    [DefaultWaitInterval(2000)]
    public class CheckBoxTest : TestBase
    {
        public CheckBoxTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("CheckBox").GetPageAs<CheckBoxTestPage>();
        }

        [Test]
        public void TestPresenceAndNoLabelVisible()
        {
            page.SimpleCheckbox.IsPresent.Wait().That(Is.True);
            page.SimpleCheckbox.Label.IsPresent.Wait().That(Is.False);
        }

        [Test]
        public void TestLabelPresenceOnCheckboxWithLabel()
        {
            page.CheckboxWithLabel.Label.IsPresent.Wait().That(Is.True);
            page.CheckboxWithLabel.Label.Text.Wait().That(Is.EqualTo("Checkbox label"));
        }

        [Test]
        public void TestCheckboxDisabled()
        {
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.False);
            page.CheckboxToDisable.Label.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.True);
        }

        [Test]
        public void TestCheckboxDisabledAndCheckedStates()
        {
            page.CheckboxWithDisabledState.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.False);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.True);

            page.CheckboxToDisable.Label.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.True);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.True);

            page.CheckboxWithDisabledState.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.True);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.True);

            page.CheckboxToDisable.Label.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.False);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.True);

            page.CheckboxWithDisabledState.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.False);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.False);

            page.CheckboxToDisable.Label.Click();
            page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.True);
            page.CheckboxWithDisabledState.IsChecked.Wait().That(Is.False);
        }

        [Test]
        public void TestCheckboxDisabledNegative()
        {
            Following.CodeFails(() => page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.True));
            page.CheckboxToDisable.Click();
            Following.CodeFails(() => page.CheckboxWithDisabledState.IsDisabled.Wait().That(Is.False));
        }

        private CheckBoxTestPage page;
    }
}