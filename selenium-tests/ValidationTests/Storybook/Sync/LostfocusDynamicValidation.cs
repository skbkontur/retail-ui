using NUnit.Framework;

using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class LostfocusDynamicValidation : StorybookTestBase
    {
        [Test]
        public void TestValidationDoesNotDisappear()
        {
            var page = new Page(GetWebDriver()).Wait();
            page.InputBValidation.IsPresent.Wait().True();
            page.InputA.SetValue("bad");
            page.InputA.WithError().Wait().True();
            var text = page.InputAValidation.Label.Text.Wait().That(Does.StartWith("incorrect times:"));

            page.InputB.InputValue("xxx");
            page.InputA.WithError().Wait().True();
            page.InputAValidation.Label.Text.Wait().That(Does.StartWith("incorrect times:").And.Not.EqualTo(text));
        }

        private class Page : PageBase
        {
            public Page(RemoteWebDriver webDriver)
                : base(webDriver)
            {
                InputAValidation = new ValidationWrapper(this, new UniversalSelector("##InputAValidation"));
                InputA = new Input(this, new UniversalSelector("##InputA"));
                InputBValidation = new ValidationWrapper(this, new UniversalSelector("##InputBValidation"));
                InputB = new Input(this, new UniversalSelector("##InputB"));
            }

            public ValidationWrapper InputAValidation { get; }
            public Input InputA { get; }
            public ValidationWrapper InputBValidation { get; }
            public Input InputB { get; }

            public Page Wait()
            {
                InputA.IsPresent.Wait().True();
                return this;
            }
        }
    }
}
