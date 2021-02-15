using NUnit.Framework;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidSubmitValidation : StorybookTestBase
    {
        public PreinvalidSubmitValidation()
        {
          this.url = "preinvalid-submit-validation";
        }

        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).WaitReady();
            page.Input.Value.Wait().EqualTo("bad");
            page.Input.WaitNoError();
            page.ValidationState.WaitText("none");
            page.InputValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestValidateOnSubmit()
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
