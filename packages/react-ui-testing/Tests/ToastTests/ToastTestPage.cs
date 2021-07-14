using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ToastTests
{
    [AutoFillControls]
    public class ToastTestPage : PageBase
    {
        public ToastTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Button SimpleToastButton { get; set; }

        public Toast SimpleToast { get; set; }

        public Button ToastWithActionButton { get; set; }

        public Toast ToastWithAction { get; set; }

        public Button StaticToastButton { get; set; }
    }
}
