using FluentAssertions;

using NUnit.Framework;

using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ExposeTidToDomTests
{
    [DefaultWaitInterval(2000)]
    public class ExposeTidToDomTest : TestBase
    {
        public ExposeTidToDomTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("ExposeTidToDom").GetPageAs<ExposeTidToDomTestPage>();
        }

        [Test]
        public void TestSwithStateWithoutKeys()
        {
            RunTidSwitchCaseTest(page.SameDomElementCase);
        }

        [Test]
        public void TestSwithStateWithKeys()
        {
            RunTidSwitchCaseTest(page.SameDomElementWithKeyCase);
        }

        [Test]
        public void TestNestingComponents()
        {
            page.NestingComponentsCase.NestingComponentsContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 1");
            page.NestingComponentsCase.SwitchState.Click();
            page.NestingComponentsCase.NestingComponentsContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 2");
        }

        [Test]
        public void TestNestingDomElements()
        {
            page.NestingDomElementsCase.NestingDomContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 1");
            page.NestingDomElementsCase.SwitchState.Click();
            page.NestingDomElementsCase.NestingDomContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 2");
        }

        [Test]
        public void TestDoubleNestingComponents()
        {
            page.DoubleNestingComponentsCase.DoubleNestingContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 1");
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.DoubleNestingContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 2");
        }

        [Test]
        public void TestDoubleNestingComponentsSelectByComponentName()
        {
            page.DoubleNestingComponentsCase.DoubleNestingContainer
                .ExpectTo().BePresent().And
                .Text.EqualTo("Вложение 1");
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.NestingContainer.ExpectTo().BePresent();
            page.DoubleNestingComponentsCase.NestedComp1.ExpectTo().BePresent();
            page.DoubleNestingComponentsCase.NestedComp2.ExpectTo().BeAbsent();
        }

        [Test]
        public void TestTable()
        {
            page.SimpleTable.Header1.ExpectTo().Text.EqualTo("Header 1");
            page.SimpleTable.Header2.ExpectTo().Text.EqualTo("Header 2");
            page.SimpleTable.Rows[0].Cell1.ExpectTo().Text.EqualTo("Cell 11");
            page.SimpleTable.Rows[0].Cell2.ExpectTo().Text.EqualTo("Cell 12");
            page.SimpleTable.Rows[1].Cell1.ExpectTo().Text.EqualTo("Cell 21");
            page.SimpleTable.Rows[1].Cell2.ExpectTo().Text.EqualTo("Cell 22");
            page.SimpleTable.Footer1.ExpectTo().Text.EqualTo("Footer 1");
            page.SimpleTable.Footer2.ExpectTo().Text.EqualTo("Footer 2");
        }

        [Test]
        public void TestFilterProps()
        {
            page.PropsFilteringCase.Component1.ExpectTo().BePresent();
            page.PropsFilteringCase.Component1.GetAttributeValue("data-prop-customProp1").Should().Be("value-1");
            page.PropsFilteringCase.Component1.GetAttributeValue("data-prop-customProp2").Should().BeNull();
            page.PropsFilteringCase.Component2.GetAttributeValue("data-prop-customProp2").Should().Be("value-2");
        }

        [Test]
        public void TestDivInsideParagraph()
        {
            IgnoreIfReactVersionSatisfies("<15.0.0", " скрипт ломает некорректный порядок тэгов например, div внутри p");
            page.DivInsideParagraph.Text.Wait().That(Is.EqualTo("Value"));
        }

        [Test]
        public void TestSwithTidOnSameComponent()
        {
            RunTidSwitchCaseTest(page.ChangeDataTidCase);
        }

        private static void RunTidSwitchCaseTest(SameDomElementCase changeStateCase)
        {
            changeStateCase.State1
                           .ExpectTo().BePresent().And
                           .Text.Contain("Состояние 1").And
                           .Contain("Контент 1");
            changeStateCase.State2.ExpectTo().BeAbsent();

            changeStateCase.SwitchState.Click();

            changeStateCase.State1.ExpectTo().BeAbsent();
            changeStateCase.State2
                           .ExpectTo().BePresent().And
                           .Text.Contain("Состояние 2").And
                           .Contain("Контент 2");
        }

        private ExposeTidToDomTestPage page;
    }
}