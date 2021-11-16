using FluentAssertions;

using NUnit.Framework;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Tests.ListTests
{
    public class ConvertUniversalSelectorToCssSelectorTests
    {
        [Test]
        public void TestConversion()
        {
            UniversalSelector.ConvertUniversalSelectorToCssSelector("input##SomeTid")
                             .Should().Be("input[data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("someTag##SomeTid")
                             .Should().Be("someTag[data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("Input##SomeTid")
                             .Should().Be("[data-comp-name~='Input'][data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("Input.SomeClass##SomeTid")
                             .Should().Be("[data-comp-name~='Input'].SomeClass[data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("Input.someClass##SomeTid")
                             .Should().Be("[data-comp-name~='Input'].someClass[data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("Input.someClass##SomeTid[data-value='Yyy']")
                             .Should().Be("[data-comp-name~='Input'].someClass[data-tid~='SomeTid'][data-value='Yyy']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("input##SomeTid Input##SomeTid")
                             .Should().Be("input[data-tid~='SomeTid'] [data-comp-name~='Input'][data-tid~='SomeTid']");
            UniversalSelector.ConvertUniversalSelectorToCssSelector("input##(SomeTid[0])")
                             .Should().Be("input[data-tid~='SomeTid[0]']");
        }

        [Test]
        public void Test_UniversalSelector_SeleniumBy()
        {
            Assert.Multiple(() =>
                {
                    Assert.That(
                        new UniversalSelector("::local").SeleniumBy,
                        Is.EqualTo(By.XPath(".")));
                    Assert.That(
                        new UniversalSelector("##Zzzz").SeleniumBy,
                        Is.EqualTo(By.CssSelector("[data-tid~='Zzzz']")));
                    Assert.That(
                        new UniversalSelector("noscript:portal span").SeleniumBy,
                        Is.EqualTo(new ViaPortalBy(By.CssSelector("noscript"), By.CssSelector("span"))));
                });

        }
    }
}
