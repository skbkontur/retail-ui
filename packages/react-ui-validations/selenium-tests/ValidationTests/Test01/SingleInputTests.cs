using NUnit.Framework;

using SKBKontur.SeleniumTesting;
using SKBKontur.ValidationTests.Bases;

namespace SKBKontur.ValidationTests.Test01
{
    public class SingleInputTests : TestBase
    {
        [SetUp]
        public void SetUp()
        {
            page = GetValue<Page>("SingleInput", "Example1");
        }

        [Test]
        public void Test01()
        {
            page.SingleInput.ClearAndInputText("123");
            page.SingleInput.ExpectTo().Value.EqualTo("123");
            page.SingleInput.ExpectTo().BeInNormalState();
            page.ValidationWrapper.TextMessage.ExpectTo().BeAbsent();
            page.ClickArea.Click();
            page.ValidationWrapper.TextMessage.ExpectTo().Text.EqualTo("Значение должно состоять из двух слов");
            page.SingleInput.ExpectTo().BeInErrorState();
            page.SingleInput.Click();
            page.SingleInput.AppendText("1");
            page.SingleInput.ExpectTo().BeInNormalState();
            page.ValidationWrapper.TextMessage.ExpectTo().Text.EqualTo("Значение должно состоять из двух слов");

            page.ClickArea.Click();
            page.ValidationWrapper.TextMessage.ExpectTo().Text.EqualTo("Значение должно состоять из двух слов");
            page.SingleInput.ExpectTo().BeInErrorState();
        }

        private Page page;
    }
}