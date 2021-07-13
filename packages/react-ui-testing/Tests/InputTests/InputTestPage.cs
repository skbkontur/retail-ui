using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.InputTests
{
    [AutoFillControls]
    public class InputTestPage : PageBase
    {
        public InputTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button UpdateInputWithDelay { get; private set; }
        public Input SimpleInput { get; private set; }
        public Input NotExistentInput { get; private set; }
        public Input InputWithDelay { get; private set; }
        public Input DisabledInput { get; private set; }
        public Input InputAppearsAfterTimeout { get; private set; }
        public Button ShowInputAppearsAfterTimeout { get; private set; }
    }
}