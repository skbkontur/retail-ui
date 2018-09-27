using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class SubmitValidation : StorybookTestBase
    {
        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.WithError().Wait().False();
            page.ValidationState.Text.Wait().EqualTo("none");
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestDoNotValidateUntilSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestValidateOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");

            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();
            page.ValidationState.Text.Wait().EqualTo("invalid");
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestResetValidationAfterEdit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();

            page.Input.SetValue("bad");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestValidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("ok");
            page.SubmitButton.Click();
            page.Input.WithError().Wait().False();
            page.ValidationState.Text.Wait().EqualTo("valid");
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.SubmitButton.Click();
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestUpdateInvalidToValidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.SendKeys("d");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.TabOut();
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestUpdateInvalidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();

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
