using FluentAssertions;

using NUnit.Framework;

namespace SKBKontur.SeleniumTesting.Tests.ListTests
{
    public class ConvertUniversalSelectorToCssSelectorTests
    {
        [TestCase("input##SomeTid", "input[data-tid~='SomeTid']")]
        [TestCase("someTag##SomeTid", "someTag[data-tid~='SomeTid']")]
        [TestCase("Input##SomeTid", "[data-comp-name~='Input'][data-tid~='SomeTid']")]
        [TestCase("Input.SomeClass##SomeTid", "[data-comp-name~='Input'].SomeClass[data-tid~='SomeTid']")]
        [TestCase("Input.someClass##SomeTid", "[data-comp-name~='Input'].someClass[data-tid~='SomeTid']")]
        [TestCase("Input.someClass##SomeTid[data-value='Yyy']", "[data-comp-name~='Input'].someClass[data-tid~='SomeTid'][data-value='Yyy']")]
        [TestCase("input##SomeTid Input##SomeTid", "input[data-tid~='SomeTid'] [data-comp-name~='Input'][data-tid~='SomeTid']")]
        [TestCase("input##(SomeTid[0])", "input[data-tid~='SomeTid[0]']")]
        [TestCase("input##SomeTid^^", "input[data-tid*='SomeTid']")]
        [TestCase("CustomComponent^^", "[data-comp-name*='CustomComponent']")]
        [TestCase("MenuItem:not([data-prop-disabled='true'])", "[data-comp-name~='MenuItem']:not([data-prop-disabled='true'])")]
        public void TestConversion(string input, string result)
        {
            UniversalSelector.ConvertUniversalSelectorToCssSelector(input)
                             .Should().Be(result);
        }
    }
}