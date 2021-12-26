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
            page.NestingComponentsCase.NestingComponentsContainer.IsPresent.Wait().True();
            page.NestingComponentsCase.NestingComponentsContainer.Text.Wait().EqualTo("Вложение 1");
            page.NestingComponentsCase.SwitchState.Click();
            page.NestingComponentsCase.NestingComponentsContainer.Text.Wait().EqualTo("Вложение 2");
        }

        [Test]
        public void TestNestingDomElements()
        {
            page.NestingDomElementsCase.NestingDomContainer.IsPresent.Wait().True();
            page.NestingDomElementsCase.NestingDomContainer.Text.Wait().EqualTo("Вложение 1");
            page.NestingDomElementsCase.SwitchState.Click();
            page.NestingDomElementsCase.NestingDomContainer.Text.Wait().EqualTo("Вложение 2");
        }

        [Test]
        public void TestDoubleNestingComponents()
        {
            page.DoubleNestingComponentsCase.DoubleNestingContainer.IsPresent.Wait().True();
            page.DoubleNestingComponentsCase.DoubleNestingContainer.Text.Wait().EqualTo("Вложение 1");
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.DoubleNestingContainer.Text.Wait().EqualTo("Вложение 2");
        }

        [Test]
        public void TestDoubleNestingComponentsSelectByComponentName()
        {
            page.DoubleNestingComponentsCase.DoubleNestingContainer.IsPresent.Wait().True();
            page.DoubleNestingComponentsCase.DoubleNestingContainer.Text.Wait().EqualTo("Вложение 1");
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.SwitchState.Click();
            page.DoubleNestingComponentsCase.NestingContainer.IsPresent.Wait().True();
            page.DoubleNestingComponentsCase.NestedComp1.IsPresent.Wait().True();
            page.DoubleNestingComponentsCase.NestedComp2.IsPresent.Wait().False();
        }

        [Test]
        public void TestTable()
        {
            page.SimpleTable.Header1.Text.Wait().EqualTo("Header 1");
            page.SimpleTable.Header2.Text.Wait().EqualTo("Header 2");
            page.SimpleTable.Rows[0].Cell1.Text.Wait().EqualTo("Cell 11");
            page.SimpleTable.Rows[0].Cell2.Text.Wait().EqualTo("Cell 12");
            page.SimpleTable.Rows[1].Cell1.Text.Wait().EqualTo("Cell 21");
            page.SimpleTable.Rows[1].Cell2.Text.Wait().EqualTo("Cell 22");
            page.SimpleTable.Footer1.Text.Wait().EqualTo("Footer 1");
            page.SimpleTable.Footer2.Text.Wait().EqualTo("Footer 2");
        }

        [Test]
        public void TestFilterProps()
        {
            page.PropsFilteringCase.Component1.IsPresent.Wait().True();
            page.PropsFilteringCase.Component1.Container.GetAttribute("data-prop-customProp1").Should().Be("value-1");
            page.PropsFilteringCase.Component1.Container.GetAttribute("data-prop-customProp2").Should().BeNull();
            page.PropsFilteringCase.Component2.Container.GetAttribute("data-prop-customProp2").Should().Be("value-2");
        }

        [Test]
        public void TestDivInsideParagraph()
        {
            IgnoreIfReactVersionSatisfies("<15.0.0",
                " скрипт ломает некорректный порядок тэгов например, div внутри p");
            page.DivInsideParagraph.Text.Wait().That(Is.EqualTo("Value"));
        }

        [Test]
        public void TestSwithTidOnSameComponent()
        {
            RunTidSwitchCaseTest(page.ChangeDataTidCase);
        }

        private static void RunTidSwitchCaseTest(SameDomElementCase changeStateCase)
        {
            changeStateCase.State1.IsPresent.Wait().True();
            changeStateCase.State1.Text.Wait().That(Does.Contain("Состояние 1").And.Contain("Контент 1"));
            changeStateCase.State2.IsPresent.Wait().False();

            changeStateCase.SwitchState.Click();

            changeStateCase.State1.IsPresent.Wait().False();
            changeStateCase.State2.IsPresent.Wait().True();
            changeStateCase.State2.Text.Wait().That(Does.Contain("Состояние 2").And.Contain("Контент 2"));
        }

        private ExposeTidToDomTestPage page;
    }
}
