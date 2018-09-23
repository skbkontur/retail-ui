using System;

using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.SidePages
{
    [DefaultWaitInterval(5000)]
    public class SidePageTests : TestBase
    {
        public SidePageTests(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion, "0.11.0")
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("SidePage").GetPageAs<SidePageTestPage>();
        }

        [Test]
        public void Test_Stateless_OpenAndClose()
        {
            CheckSidePage(() => page.OpenStateless.Click(), page.StatelessSidePage);
        }

        [Test]
        public void Test_Statefull_OpenAndClose()
        {
            CheckSidePage(() => page.OpenStatefull.Click(), page.StatefullSidePage);
        }

        private void CheckSidePage(Action openAction, SidePageTestPage.TestSidePage sidePage)
        {
            sidePage.IsPresent.Wait().That(Is.False);
            openAction();
            sidePage.IsPresent.Wait().That(Is.True);
            sidePage.Header.Text.Wait().That(Is.EqualTo("Header"));
            sidePage.Content.Text.Wait().That(Is.EqualTo("Modal content"));
            sidePage.Footer.Text.Wait().That(Is.EqualTo("Footer"));

            sidePage.Close();
            sidePage.IsPresent.Wait().That(Is.False);
        }

        private SidePageTestPage page;
    }
}