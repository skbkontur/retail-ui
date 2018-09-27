using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidImmediateValidation : StorybookTestBase
    {
        [Test]
        public void TestInvalidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestUpdateValidation()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys("d");

            page.Input.WithError().Wait().False();
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");

            page.Input.TabOut();
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }
    }
}
