using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidLostfocusValidation : StorybookTestBase
    {
        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestInvalidAfterBlur()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();

            page.Input.Click();
            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestUpdateInvalidToValid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.InputValue("ok");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestUpdateInvalidToValidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys(Keys.Backspace);
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.SendKeys("d");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestUpdateInvalidToInvalid()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys("d");
            page.Input.WaitNoError();
            page.InputValidation.Label.WaitAbsent();

            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestInvalidOnSubmit()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.SubmitButton.Click();
            page.Input.WaitError();
            page.ValidationState.WaitText("invalid");
            page.InputValidation.Label.WaitText("incorrect value");
        }
    }
}
