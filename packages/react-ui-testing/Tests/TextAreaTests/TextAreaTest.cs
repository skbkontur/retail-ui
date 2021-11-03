using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.TextAreaTests
{
    [DefaultWaitInterval(2000)]
    public class TextAreaTest : TestBase
    {
        public TextAreaTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Textarea").GetPageAs<TextAreaTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleTextarea.IsPresent.Wait().True();
        }

        [Test]
        public void TestInputAndCheckText()
        {
            page.SimpleTextarea.ClearAndInputText("test");
            page.SimpleTextarea.Value.Wait().EqualTo("test");
            page.SimpleTextarea.ClearAndInputText("another-test");
            page.SimpleTextarea.Value.Wait().EqualTo("another-test");
        }

        [Test]
        public void TestClear()
        {
            page.SimpleTextarea.ClearAndInputText("test");
            page.SimpleTextarea.Clear();
            page.SimpleTextarea.Value.Wait().EqualTo("");
        }

        private TextAreaTestPage page;
    }
}
