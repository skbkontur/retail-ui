using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.TextAreaTests
{
    [AutoFillControls]
    public class TextAreaTestPage : PageBase
    {
        public TextAreaTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public TextArea SimpleTextarea { get; private set; }
    }
}