using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.InputTests
{
    [DefaultWaitInterval(2000)]
    public class InputTest : TestBase
    {
        public InputTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Input").GetPageAs<InputTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.SimpleInput.IsPresent.Wait().True();
            page.SimpleInput.MouseOver();
        }

        [Test]
        public void TestInputEmptyValue()
        {
            page.SimpleInput.IsPresent.Wait().True();
            page.SimpleInput.ClearAndInputText("Test");
            page.SimpleInput.Value.Wait().EqualTo("Test");
            page.DisabledInput.Value.Wait().EqualTo("Test");
            page.SimpleInput.ClearAndInputText("");
            page.SimpleInput.Value.Wait().EqualTo("");
            page.DisabledInput.Value.Wait().EqualTo("");
        }

        [Test]
        public void TestClearValue()
        {
            page.SimpleInput.IsPresent.Wait().True();
            page.SimpleInput.ClearAndInputText("Test");
            page.SimpleInput.Value.Wait().EqualTo("Test");
            page.DisabledInput.Value.Wait().EqualTo("Test");
            page.SimpleInput.Clear();
            page.SimpleInput.Value.Wait().EqualTo("");
            page.DisabledInput.Value.Wait().EqualTo("");
        }

        [Test]
        public void TestAbsense()
        {
            page.NotExistentInput.IsPresent.Wait().False();
        }

        [Test]
        public void TestDisabledInput()
        {
            page.DisabledInput.IsDisabled.Wait().True();
        }

        [Test]
        public void TestInputText()
        {
            page.SimpleInput.ClearAndInputText("hello");
            page.SimpleInput.Value.Wait().EqualTo("hello");
        }

        [Test]
        public void TestClearInput()
        {
            page.SimpleInput.ClearAndInputText("hello");
            page.SimpleInput.Value.Wait().EqualTo("hello");
            page.SimpleInput.Clear();
            page.SimpleInput.Value.Wait().EqualTo("");
        }

        [Test]
        [DefaultWaitInterval(4000)]
        public void TestInputTextIntoControlThatAppearsAfterTimeout()
        {
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.ClearAndInputText("hello");
            page.InputAppearsAfterTimeout.Value.Wait().EqualTo("hello");
        }

        [Test]
        [DefaultWaitInterval(4000)]
        public void TestCheckValueIntoControlThatAppearsAfterTimeout()
        {
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.ClearAndInputText("hello");
            page.InputAppearsAfterTimeout.Value.Wait().EqualTo("hello");
            page.ShowInputAppearsAfterTimeout.Click();
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.Value.Wait().EqualTo("hello");
        }


        [Test]
        public void TestInputWithDelay()
        {
            page.InputWithDelay.Value.Wait().EqualTo("");
            page.UpdateInputWithDelay.Click();
            page.InputWithDelay.Value.Wait().EqualTo("NewText");
        }

        private InputTestPage page;
    }
}
