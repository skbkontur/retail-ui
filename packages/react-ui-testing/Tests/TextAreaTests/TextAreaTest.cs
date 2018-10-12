using NUnit.Framework;

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
            page.SimpleTextarea.ExpectTo().BePresent();
        }

        [Test]
        public void TestInputAndCheckText()
        {
            page.SimpleTextarea.ClearAndInputText("test");
            page.SimpleTextarea.ExpectTo().Value.EqualTo("test");
            page.SimpleTextarea.ClearAndInputText("another-test");
            page.SimpleTextarea.ExpectTo().Value.EqualTo("another-test");
        }

        [Test]
        public void TestClear()
        {
            page.SimpleTextarea.ClearAndInputText("test");
            page.SimpleTextarea.Clear();
            page.SimpleTextarea.ExpectTo().Value.EqualTo("");
        }

        private TextAreaTestPage page;
    }
}