using NUnit.Framework;

using OpenQA.Selenium;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidImmediateValidation : StorybookTestBase
    {
        public PreinvalidImmediateValidation()
        {
          this.url = "preinvalid-immediate-validation";
        }

        [Test]
        public void TestInvalidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }

        [Test]
        public void TestUpdateValidation()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");

            page.Input.Click();
            page.Input.SendKeys(Keys.End);
            page.Input.SendKeys("d");

            page.Input.WaitNoError();
            page.InputValidation.Label.WaitText("incorrect value");

            page.Input.TabOut();
            page.Input.WaitError();
            page.InputValidation.Label.WaitText("incorrect value");
        }
    }
}
