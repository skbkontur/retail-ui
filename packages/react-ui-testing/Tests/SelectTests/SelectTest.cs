using NUnit.Framework;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.SelectTests
{
    [DefaultWaitInterval(2000)]
    public class SelectTest : TestBase
    {
        public SelectTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Select").GetPageAs<SelectTestPage>();
        }

        [Test]
        public void TestPresense()
        {
            page.SimpleSelect.ExpectTo().BePresent();
        }

        [Test]
        public void TestSelectValueText()
        {
            page.SimpleSelect.SelectValueByText("item 2");
            page.SimpleSelect.ExpectTo().SelectedValueText.EqualTo("item 2");
        }

        [Test]
        public void TestSelectValueByValue()
        {
            page.SelectWithIdInValues.SelectValueByValue("item 2");
            page.SelectWithIdInValues.ExpectTo().SelectedValueText.EqualTo("item caption 2");
        }

        [Test]
        public void TestSelectValueByValueInSimpleSelect()
        {
            page.SimpleSelect.SelectValueByValue("item 2");
            page.SimpleSelect.ExpectTo().SelectedValueText.EqualTo("item 2");
        }

        private SelectTestPage page;
    }

    [AutoFillControls]
    public class SelectTestPage : PageBase
    {
        public SelectTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Select SimpleSelect { get; private set; }
        public Select SelectWithIdInValues { get; private set; }
    }
}