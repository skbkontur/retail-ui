using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidLostfocusValidation : StorybookTestBase
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
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.InputValue("ok");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.TabOut();
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestUpdateInvalidToValidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.SendKeys("d");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.TabOut();
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestUpdateInvalidToInvalid()
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

        [Test]
        public void TestInvalidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");

            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();
            page.ValidationState.Text.Wait().EqualTo("invalid");
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }
    }
}
