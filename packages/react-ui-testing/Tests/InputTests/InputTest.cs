using System.Text.RegularExpressions;

using FluentAssertions;

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
            page.SimpleInput.ExpectTo().BePresent();
            page.SimpleInput.MouseOver();
        }

        [Test]
        public void TestInputEmptyValue()
        {
            page.SimpleInput.ExpectTo().BePresent();
            page.SimpleInput.ClearAndInputText("Test");
            page.SimpleInput.ExpectTo().Value.EqualTo("Test");
            page.DisabledInput.ExpectTo().Value.EqualTo("Test");
            page.SimpleInput.ClearAndInputText("");
            page.SimpleInput.ExpectTo().Value.EqualTo("");
            page.DisabledInput.ExpectTo().Value.EqualTo("");
        }

        [Test]
        public void TestClearValue()
        {
            page.SimpleInput.ExpectTo().BePresent();
            page.SimpleInput.ClearAndInputText("Test");
            page.SimpleInput.ExpectTo().Value.EqualTo("Test");
            page.DisabledInput.ExpectTo().Value.EqualTo("Test");
            page.SimpleInput.Clear();
            page.SimpleInput.ExpectTo().Value.EqualTo("");
            page.DisabledInput.ExpectTo().Value.EqualTo("");
        }

        [Test]
        public void TestAbsense()
        {
            page.NotExistentInput.ExpectTo().BeAbsent();
        }

        [Test]
        public void TestDisabledInput()
        {
            page.DisabledInput.ExpectTo().HaveProperty(x => x.IsDisabled, "disabled").BeTrue();
            page.DisabledInput.ExpectTo().BeDisabled();
        }

        [Test]
        public void TestInputText()
        {
            page.SimpleInput.ClearAndInputText("hello");
            page.SimpleInput.ExpectTo().HaveProperty(x => x.Value, "Value").EqualTo("hello");
        }

        [Test]
        public void TestClearInput()
        {
            page.SimpleInput.ClearAndInputText("hello");
            page.SimpleInput.ExpectTo().Value.EqualTo("hello");
            page.SimpleInput.Clear();
            page.SimpleInput.ExpectTo().Value.EqualTo("");
        }

        [Test]
        [DefaultWaitInterval(1000)]
        public void Test_InputTextIntoControlThatAppearsAfterTimeout_ErrorMessage()
        {
            Following
                .Code(() =>
                    {
                        page.ShowInputAppearsAfterTimeout.Click();
                        page.InputAppearsAfterTimeout.ClearAndInputText("hello");
                        page.InputAppearsAfterTimeout.ExpectTo().Value.EqualTo("hello");
                    })
                .Should().Throw<AssertionException>().Which.Message
                .Should().Be(To.Text(
                    @"Input(##InputAppearsAfterTimeout): требовалось действие InputText(hello), но",
                    @"  не смогли долждаться присутсвия элемента: Input(##InputAppearsAfterTimeout)",
                    @"Время ожидания: 1000ms."
                                 ));
        }

        [Test]
        [DefaultWaitInterval(4000)]
        public void TestInputTextIntoControlThatAppearsAfterTimeout()
        {
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.ClearAndInputText("hello");
            page.InputAppearsAfterTimeout.ExpectTo().Value.EqualTo("hello");
        }

        [Test]
        [DefaultWaitInterval(4000)]
        public void TestCheckValueIntoControlThatAppearsAfterTimeout()
        {
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.ClearAndInputText("hello");
            page.InputAppearsAfterTimeout.ExpectTo().Value.EqualTo("hello");
            page.ShowInputAppearsAfterTimeout.Click();
            page.ShowInputAppearsAfterTimeout.Click();
            page.InputAppearsAfterTimeout.ExpectTo().Value.EqualTo("hello");
        }

        [Test]
        public void Test_CheckDisabledViaAnd_ErrorMessage()
        {
            Following
                .Code(
                    () =>
                        {
                            page.SimpleInput.ClearAndInputText("hello");
                            page.SimpleInput.ExpectTo()
                                .BeDisabled().And
                                .HaveProperty(x => x.Value, "Value").EqualTo("hello");
                        })
                .Should().Throw<AssertionException>().Which.Message
                .Should().Be(To.Text(
                    @"Input(##SimpleInput): поле disabled ожидалось истиным, но было:",
                    @"  'False'",
                    @"Время ожидания: 2000ms."
                                 ));
        }

        [Test]
        public void Test_Presence_ErrorMessage()
        {
            Following
                .Code(() => page.SimpleInput.ExpectTo().BeAbsent())
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): ожидалось отсутствие",
                    @"Время ожидания: 2000ms."));
        }

        [Test]
        public void Test_Disabled_ErrorMessage()
        {
            Following
                .Code(() => page.SimpleInput.ExpectTo().HaveProperty(x => x.IsDisabled, "disabled").BeTrue())
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): поле disabled ожидалось истиным, но было:",
                    "  'False'",
                    @"Время ожидания: 2000ms."));
        }

        [Test]
        public void Test_CustomExpression_ErrorMessage()
        {
            Following
                .Code(() => page.SimpleInput.ExpectTo().Satisfy(x => x.Value.Get() == "Blah", "ожидалось волшебство"))
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): ожидалось волшебство",
                    @"Время ожидания: 2000ms."));
        }

        [Test]
        public void Test_PropertyAssertButAbsense_ErrorMessage()
        {
            Following
                .Code(() => page.NotExistentInput.ExpectTo().HaveProperty(x => x.Value, "value").EqualTo("bye"))
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##NotExistentInput): поле value ожидалось равным:",
                    @"  'bye', но не был найден контрол Input(##NotExistentInput)",
                    @"Время ожидания: 2000ms."
                        ));
        }

        [Test]
        public void Test_Absense_ErrorMessage()
        {
            Following
                .Code(() => page.NotExistentInput.ExpectTo().BePresent())
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##NotExistentInput): ожидалось присутствие",
                    @"Время ожидания: 2000ms."
                        ));
        }

        [Test]
        public void Test_PropertyEqual_ErrorMessage()
        {
            page.SimpleInput.ClearAndInputText("hello");
            Following
                .Code(() => page.SimpleInput.ExpectTo().HaveProperty(x => x.Value, "value").EqualTo("bye"))
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): поле value ожидалось равным:",
                    @"  'bye', но было:",
                    @"  'hello'",
                    @"Время ожидания: 2000ms."
                        ));
        }

        [Test]
        public void Test_PropertyNotEqualViaNegationSpecifier_ErrorMessage()
        {
            page.SimpleInput.ClearAndInputText("hello");
            Following
                .Code(() => page.SimpleInput.ExpectTo().HaveProperty(x => x.Value, "value").Not().EqualTo("hello"))
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): поле value ожидалось не равным:",
                    @"  'hello', но было:",
                    @"  'hello'",
                    @"Время ожидания: 2000ms."));
        }

        [Test]
        public void Test_PropertyMatch_ErrorMessage()
        {
            page.SimpleInput.ClearAndInputText("hello");
            Following
                .Code(() => page.SimpleInput.ExpectTo().HaveProperty(x => x.Value, "value").MatchToRegex(new Regex(@"\d+")))
                .Should().Throw<AssertionException>().Which.Message.Should()
                .Be(To.Text(
                    @"Input(##SimpleInput): поле value ожидалось соотвествующим regex-у:",
                    @"  '\d+', но было:",
                    @"  'hello'",
                    @"Время ожидания: 2000ms."));
        }

        [Test]
        public void TestInputWithDelay()
        {
            page.InputWithDelay.ExpectTo().HaveProperty(x => x.Value, "Value").EqualTo("");
            page.UpdateInputWithDelay.Click();
            page.InputWithDelay.ExpectTo().HaveProperty(x => x.Value, "Value").EqualTo("NewText");
        }

        private InputTestPage page;
    }
}