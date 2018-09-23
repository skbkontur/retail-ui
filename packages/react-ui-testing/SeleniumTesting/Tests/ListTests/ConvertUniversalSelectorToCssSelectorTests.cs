using FluentAssertions;

using NUnit.Framework;

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
    }
}