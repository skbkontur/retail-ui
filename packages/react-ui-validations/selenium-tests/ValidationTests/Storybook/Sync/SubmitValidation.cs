using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class SubmitValidation : StorybookTestBase
    {
        public SubmitValidation()
        {
          this.url = "submit-validation";
        }

        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.WaitNoError();
            page.ValidationState.WaitText("none");
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestDoNotValidateUntilSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestValidateOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");

            page.SubmitButton.Click();
            page.Input.WaitError();
            page.ValidationState.WaitText("invalid");
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestResetValidationAfterEdit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();

            page.Input.SetValue("bad");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestValidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("ok");
            page.SubmitButton.Click();
            page.Input.WaitNoError();
            page.ValidationState.WaitText("valid");
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WaitError();

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();

            page.SubmitButton.Click();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestUpdateInvalidToValidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WaitError();

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.SendKeys("d");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestUpdateInvalidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");
            page.SubmitButton.Click();
            page.Input.WaitError();

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys("d");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();

            page.SubmitButton.Click();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }
    }
}
