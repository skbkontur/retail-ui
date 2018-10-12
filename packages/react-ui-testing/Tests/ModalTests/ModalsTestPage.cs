using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ModalTests
{
    [AutoFillControls]
    public class ModalsTestPage : PageBase
    {
        public ModalsTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public ModalWithStatelessComponentWithShowPropsCase ModalWithStatelessComponentWithShowPropsCase { get; private set; }
        public ModalWithStatefullComponentWithShowPropsCase ModalWithStatefullComponentWithShowPropsCase { get; private set; }
    }
}