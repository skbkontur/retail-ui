using NUnit.Framework;
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
            page.FilledComboBox.ExpectTo().Text.EqualTo("Item 1");
            page.FilledComboBox.Clear();
            page.FilledComboBox.ExpectTo().Text.BeEmpty();
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
            page.SimpleComboBoxItems.Count.Wait().That(Is.EqualTo(17));
        }

        [Test]
        public void Test_ComboBox_DisablePortal()
        {
            page.ComboBoxNoPortal.Click();
            page.NoPortalComboBoxItems.Count.Wait().That(Is.EqualTo(17));
            page.ComboBoxNoPortal.InputTextAndSelectFirst("Item 1");
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
