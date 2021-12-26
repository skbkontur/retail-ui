using NUnit.Framework;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ComboBoxTests
{
    public class ComboBoxTest : TestBase
    {
        public ComboBoxTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("ComboBoxes").GetPageAs<ComboBoxesTestPage>();
        }

        [Test]
        public void Clear()
        {
            page.FilledComboBox.Text.Wait().EqualTo("Item 1");
            page.FilledComboBox.Clear();
            page.FilledComboBox.Text.Wait().EqualTo(string.Empty);
        }

        [Test]
        public void InputText()
        {
            page.SimpleComboBox.InputText("123");
            page.SimpleComboBox.Text.Wait().EqualTo("123");

            page.SimpleComboBox.InputText("4" + Keys.Tab);
            page.SimpleComboBox.Text.Wait().EqualTo("1234");

            page.SimpleComboBox.Clear();
            page.SimpleComboBox.InputTextAndSelectSingle("8");
            page.SimpleComboBox.Text.Wait().EqualTo("Item 8");

            page.DisabledComboBox.Click();
            page.SimpleComboBox.Text.Wait().EqualTo("Item 8");
        }

        [Test]
        public void TestDisabled()
        {
            page.DisabledComboBox.IsDisabled.Wait().That(Is.True);
        }

        [Test]
        public void TestNotDisabled()
        {
            page.SimpleComboBox.IsDisabled.Wait().That(Is.False);
        }

        [Test]
        public void TestSelectViaCustomPortalSelector()
        {
            page.SimpleComboBox.Click();
            page.SimpleComboBox.Items.Count.Wait().That(Is.EqualTo(17));
        }

        [Test]
        public void Test_ComboBox_DisablePortal()
        {
            page.ComboBoxNoPortal.Click();
            // page.NoPortalComboBoxItems.Count.Wait().That(Is.EqualTo(17));
            page.ComboBoxNoPortal.Items.Count.Wait().That(Is.EqualTo(17));
            page.ComboBoxNoPortal.InputTextAndSelectFirst("Item 1");
            page.ComboBoxNoPortal.Text.Wait().EqualTo("Item 1");
        }

        [Test]
        public void Test_ComboBox_NotFound()
        {
            page.NotFoundComboBox.Click();
            page.NotFoundComboBox.NotFound.IsPresent.Wait().True();
            page.NotFoundComboBox.NotFound.Text.Wait().EqualTo("Не найдено");
        }

        private ComboBoxesTestPage page;
    }
}
