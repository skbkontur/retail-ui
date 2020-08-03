using System.Linq;
using FluentAssertions;
using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.KebabTests
{
    [DefaultWaitInterval(2000)]
    public class KebabTest : TestBase
    {
        public KebabTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion, "0.9.0")
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Kebab").GetPageAs<KebabTestPage>();
        }

        [Test]
        public void TestPresence()
        {
            page.DisabledKebab.IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void TestDisabled()
        {
            page.DisabledKebab.IsDisabled.Wait().That(Is.True);
            page.SimpleKebab.IsDisabled.Wait().That(Is.False);
        }

        [Test]
        public void TestMenuExpects()
        {
            page.SimpleKebab.Menu.ExpectTo().BeAbsent();
            page.SimpleKebab.Click();
            page.SimpleKebab.Menu.ExpectTo().BePresent();
            page.SimpleKebab.Menu.ExpectTo().Count.EqualTo(3);
        }

        [Test]
        public void TestCheckItems()
        {
            page.SimpleKebab.Menu.IsPresent.Wait().That(Is.False);
            page.SimpleKebab.Click();
            page.SimpleKebab.Menu.IsPresent.Wait().That(Is.True);
            page.SimpleKebab.Menu.Count.Wait().That(Is.EqualTo(3));
            page.SimpleKebab.Menu.Select(x => x.Text).Wait().That(Is.EqualTo(new[] {"First", "Second", "Third"}));
        }

        [Test]
        public void TestSelectItemByIndex()
        {
            page.Output.Text.Wait().That(Is.EqualTo("none"));
            page.SimpleKebab.SelectItemByIndex(1);
            page.Output.Text.Wait().That(Is.EqualTo("second"));
        }

        [Test]
        public void TestSelectItemByText()
        {
            page.Output.Text.Wait().That(Is.EqualTo("none"));
            page.SimpleKebab.SelectItem(x => x.Text.Get().Should().Be("Second"));
            page.Output.Text.Wait().That(Is.EqualTo("second"));
        }

        private KebabTestPage page;
    }
}