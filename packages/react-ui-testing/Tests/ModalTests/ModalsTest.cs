using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ModalTests
{
    [DefaultWaitInterval(5000)]
    public class ModalsTest : TestBase
    {
        public ModalsTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Modals").GetPageAs<ModalsTestPage>();
        }

        [Test]
        public void Test_ModalWithStatelessComponentWithShowPropsCase_OpenAndClose()
        {
            page.ModalWithStatelessComponentWithShowPropsCase.Modal.IsPresent.Wait().False();
            page.ModalWithStatelessComponentWithShowPropsCase.Open.Click();
            page.ModalWithStatelessComponentWithShowPropsCase.Modal.IsPresent.Wait().True();
            page.ModalWithStatelessComponentWithShowPropsCase.Modal.CloseButton.Click();
            page.ModalWithStatelessComponentWithShowPropsCase.Modal.IsPresent.Wait().False();
        }

        [Test]
        public void Test_ModalWithStatefullComponentWithShowPropsCase_OpenAndClose()
        {
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.IsPresent.Wait().False();
            page.ModalWithStatefullComponentWithShowPropsCase.Open.Click();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.IsPresent.Wait().True();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.CloseButton.Click();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.IsPresent.Wait().False();
        }

        [Test]
        public void TestModalHeader()
        {
            page.ModalWithStatefullComponentWithShowPropsCase.Open.Click();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.Header.Text.Wait()
                .That(Does.Contain("Modal header"));
        }

        [Test]
        public void TestCloseViaCloseButton()
        {
            page.ModalWithStatefullComponentWithShowPropsCase.Open.Click();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.IsPresent.Wait().True();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.Close();
            page.ModalWithStatefullComponentWithShowPropsCase.Modal.IsPresent.Wait().False();
        }

        private ModalsTestPage page;
    }
}
