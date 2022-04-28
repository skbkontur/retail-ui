using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.ValidationTests.Controls;

namespace SKBKontur.ValidationTests.Storybook.Sync
{
    public class SingleInputPage : PageBase
    {
        public SingleInputPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
            InputValidation = new ValidationWrapper(this, new UniversalSelector("##InputValidation"));
            Input = new Input(this, new UniversalSelector("##Input"));
            ValidationLevel = new Select(this, new UniversalSelector("##ValidationLevel"));
            SubmitButton = new Button(this, new UniversalSelector("##SubmitButton"));
            ValidationState = new Label(this, new UniversalSelector("##ValidationState"));
        }

        public ValidationWrapper InputValidation { get; }
        public Input Input { get; }
        public Button SubmitButton { get; }
        public Label ValidationState { get; }
        public Select ValidationLevel { get; }

    public SingleInputPage WaitReady()
        {
            SubmitButton.WaitPresent();
            ValidationLevel.WaitPresent();
            return this;
        }
    }
}
