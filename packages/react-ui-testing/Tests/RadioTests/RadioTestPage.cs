using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.RadioTests
{
    [AutoFillControls]
    public class RadioTestPage : PageBase
    {
        public RadioTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Radio SimpleRadio { get; private set; }
    }
}