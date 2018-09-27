using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class LostfocusValidation : StorybookTestBase
    {
        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.ValidationState.Text.Wait().EqualTo("none");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestValidateOnLostfocus()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.Input.WithError().Wait().True();
            page.ValidationState.Text.Wait().EqualTo("none");
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestInvalidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.Input.WithError().Wait().True();

            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();
            page.ValidationState.Text.Wait().EqualTo("invalid");
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestValidateOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.InputValue("bad");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.SubmitButton.Click();
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.IsPresent.Wait().True();
        }

        [Test]
        public void TestDoNotValidateUntilLostfocus()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.InputValue("bad");
            page.Input.WithError().Wait().False();
            page.InputValidation.Label.IsPresent.Wait().False();

            page.Input.TabOut();
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.IsPresent.Wait().True();
        }

        [Test]
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
            page.Input.WithError().Wait().True();

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
            page.Input.SetValue("bad");
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
            page.Input.WithError().Wait().True();
            page.InputValidation.Label.Text.Wait().EqualTo("incorrect value");
        }

        [Test]
        public void TestUpdateInvalidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.SetValue("bad");
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
