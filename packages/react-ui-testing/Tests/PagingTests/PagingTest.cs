using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.PagingTests
{
    [DefaultWaitInterval(2000)]
    public class PagingTest : TestBase
    {
        public PagingTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion, "0.9.0")
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Paging").GetPageAs<PagingTestPage>();
        }

        [Test]
        public void TestPagingLessThanTwo()
        {
            page.Paging1.IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void TestPaging7()
        {
            page.Paging7.ActivePage.Wait().That(Is.EqualTo(1));
            page.Paging7.PagesCount.Wait().That(Is.EqualTo(7));
            page.Paging7.GoToPage(6);
            page.Paging7.ActivePage.Wait().That(Is.EqualTo(6));
        }

        [Test]
        public void TestPaging8()
        {
            page.Paging8.ActivePage.Wait().That(Is.EqualTo(1));
            page.Paging8.PagesCount.Wait().That(Is.EqualTo(8));
            page.Paging8.GoToPage(4);
            page.Paging8.GoToPage(6);
            page.Paging8.ActivePage.Wait().That(Is.EqualTo(6));
        }

        [Test]
        public void TestPaging20()
        {
            page.Paging20.ActivePage.Wait().That(Is.EqualTo(1));
            page.Paging20.PagesCount.Wait().That(Is.EqualTo(20));
            page.Paging20.GoToNextPage();
            page.Paging20.ActivePage.Wait().That(Is.EqualTo(2));
        }

        private PagingTestPage page;
    }
}
