using NUnit.Framework;

using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class PreinvalidSubmitValidation : StorybookTestBase
    {
        [Test]
        public void TestValidByDefault()
        {
            var page = new SingleInputPage(GetWebDriver()).Wait();
            page.Input.Value.Wait().EqualTo("bad");
            page.Input.WithError().Wait().False();
            page.ValidationState.Text.Wait().EqualTo("none");
            page.InputValidation.Label.IsPresent.Wait().False();
        }

        [Test]
        public void TestValidateOnSubmit()
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
