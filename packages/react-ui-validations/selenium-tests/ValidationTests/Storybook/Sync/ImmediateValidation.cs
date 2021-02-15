using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class ImmediateValidation : StorybookTestBase
    {
        public ImmediateValidation()
        {
          this.url = "immediate-validation";
        }

        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.ValidationState.WaitText("none");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestValidateImmediately()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.InputValue("bad");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestInvalidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");

            page.SubmitButton.Click();
            page.Input.WaitError();
            page.ValidationState.WaitText("invalid");
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();

            page.Input.TabOut();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestUpdateInvalidToValidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.SetValue("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);

            page.Input.SendKeys("d");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }
    }
}
