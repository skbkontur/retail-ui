using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting;
using SKBKontur.ValidationTests.AutoFill;

namespace SKBKontur.ValidationTests.Bases
{
    [AutoFillControls]
    public class StoryBookPage : PageBase
    {
        public StoryBookPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
            webDriver.SwitchTo().Frame(webDriver.FindElement(By.Id("storybook-preview-iframe")));
        }
    }
}