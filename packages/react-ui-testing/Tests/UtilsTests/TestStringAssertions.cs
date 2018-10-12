using FluentAssertions;

using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.InputTests;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.UtilsTests
{
    [DefaultWaitInterval(2000)]
    public class TestStringAssertions : TestBase
    {
        public TestStringAssertions(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Input").GetPageAs<InputTestPage>();
        }

        [Test]
        public void TestInvalidAssertions()
        {
            page.SimpleInput.ClearAndInputText("hello");
            Following.Code(() => page.SimpleInput.ExpectTo().Value.BeOneOf("1", "2", "3")).Should().Throw<AssertionException>();
            Following.Code(() => page.SimpleInput.ExpectTo().Value.BeEmpty()).Should().Throw<AssertionException>();
            Following.Code(() => page.SimpleInput.ExpectTo().Value.HaveLength(3)).Should().Throw<AssertionException>();
            Following.Code(() => page.SimpleInput.ExpectTo().Value.Match("*hi*")).Should().Throw<AssertionException>();
        }

        [Test]
        public void TestValidAssertions()
        {
            page.SimpleInput.ClearAndInputText("hello");
            page.SimpleInput.ExpectTo().Value.BeOneOf("bye", "hello");
            page.SimpleInput.ExpectTo().Value.Not().BeEmpty();
            page.SimpleInput.ExpectTo().Value.HaveLength(5);
            page.SimpleInput.ExpectTo().Value.Match("*ell*");
        }

        private InputTestPage page;
    }
}