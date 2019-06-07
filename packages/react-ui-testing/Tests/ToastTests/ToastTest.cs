using NUnit.Framework;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ToastTests
{
    public class ToastTest : TestBase
    {
        public ToastTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Toast").GetPageAs<ToastTestPage>();
        }

        [Test]
        public void TestNotification()
        {
            page.SimpleToast.IsPresent.Wait().False();
            page.SimpleToastButton.Click();
            page.SimpleToast.IsPresent.Wait().True();
            page.SimpleToast.Text.Wait().EqualTo("Simple");
        }

        [Test]
        public void TestWithAction()
        {
            page.ToastWithActionButton.Click();
            page.ToastWithAction.IsPresent.Wait().True();
            page.ToastWithAction.Text.Wait().EqualTo("With action");
            page.ToastWithAction.Action.Text.Wait().EqualTo("action");
            page.ToastWithAction.Action.Click();
            page.ToastWithAction.IsPresent.Wait().False();
        }

        [Test]
        public void TestWithStaticToast()
        {
            var toast = Toast.Static(page);
            toast.IsPresent.Wait().False();
            page.StaticToastButton.Click();
            toast.IsPresent.Wait().True();
            toast.Text.Wait().EqualTo("Static");
            toast.Action.Text.Wait().EqualTo("close");
            toast.Action.Click();
            toast.IsPresent.Wait().False();
        }

        private ToastTestPage page;
    }
}
