using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.ValidationTests.Bases;

namespace SKBKontur.ValidationTests.Test01
{
    public class Page : StoryBookPage
    {
        public Page(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }


        public Input SingleInput { get; set; }
        public Label ClickArea { get; set; }
        public ValidationWrapper ValidationWrapper { get; set; }
    }

    public class ValidationWrapper : ControlBase
    {
        public ValidationWrapper(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            TextMessage = this.Find<Label>().By("[data-validation-message='text']");
        }

        public Label TextMessage { get; private set; }
    }
}