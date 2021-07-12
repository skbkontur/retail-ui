using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.ModalTests
{
    [AutoFillControls]
    public class ModalsTestPage : PageBase
    {
        public ModalsTestPage(IWebDriver webDriver)
            : base(webDriver)
        {
        }

        public ModalWithStatelessComponentWithShowPropsCase ModalWithStatelessComponentWithShowPropsCase { get; private set; }
        public ModalWithStatefullComponentWithShowPropsCase ModalWithStatefullComponentWithShowPropsCase { get; private set; }
    }
}