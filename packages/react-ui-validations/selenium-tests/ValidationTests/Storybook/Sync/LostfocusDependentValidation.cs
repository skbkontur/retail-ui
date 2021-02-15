using NUnit.Framework;

using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.ValidationTests.Controls;
using SKBKontur.ValidationTests.Infrastructure;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class LostfocusDependentValidation : StorybookTestBase
    {
        public LostfocusDependentValidation()
        {
          this.url = "lostfocus-dependent-validation";
        }

        [Test]
        public void TestInvalid()
        {
            var page = new Page(GetWebDriver()).WaitReady();
            page.InputA.SetValue("ba");
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitAbsent();

            page.InputB.InputValue("ba");
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitAbsent();
            page.InputB.WaitNoError();
            page.InputBValidation.Label.WaitAbsent();

            page.InputB.TabOut();
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");
            page.InputB.WaitNoError();
            page.InputBValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestChangeB_UpdateInvalidToValid()
        {
            var page = new Page(GetWebDriver()).WaitReady();
            page.InputA.SetValue("ba");
            page.InputB.SetValue("ba");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputB.InputValue("b");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputB.TabOut();
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestChangeB_UpdateInvalidToInvalid()
        {
            var page = new Page(GetWebDriver()).WaitReady();
            page.InputA.SetValue("ba");
            page.InputB.SetValue("ba");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputB.InputValue("ba");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputB.TabOut();
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");
        }

        [Test]
        public void TestChangeA_UpdateInvalidToValid()
        {
            var page = new Page(GetWebDriver()).WaitReady();
            page.InputA.SetValue("ba");
            page.InputB.SetValue("ba");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputA.InputValue("b");
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputA.TabOut();
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitAbsent();
        }

        [Test]
        public void TestChangeA_UpdateInvalidToValidToInvalid()
        {
            var page = new Page(GetWebDriver()).WaitReady();
            page.InputA.SetValue("ba");
            page.InputB.SetValue("ba");
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputA.InputValue("ba");
            page.InputA.WaitNoError();
            page.InputAValidation.Label.WaitText("duplicate value");

            page.InputA.TabOut();
            page.InputA.WaitError();
            page.InputAValidation.Label.WaitText("duplicate value");
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
                SubmitButton = new Button(this, new UniversalSelector("##SubmitButton"));
                ValidationState = new Label(this, new UniversalSelector("##ValidationState"));
            }

            public ValidationWrapper InputAValidation { get; }
            public Input InputA { get; }
            public ValidationWrapper InputBValidation { get; }
            public Input InputB { get; }
            public Button SubmitButton { get; }
            public Label ValidationState { get; }

            public Page WaitReady()
            {
                SubmitButton.WaitPresent();
                return this;
            }
        }
    }
}
