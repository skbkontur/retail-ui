using System.Linq;

using FluentAssertions;

using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.ListTests
{
    [DefaultWaitInterval(2000)]
    public class ListTest : TestBase
    {
        public ListTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Lists").GetPageAs<ListsTestPage>();
        }

        [Test]
        public void TestPresense()
        {
            page.InputWithoutTidList.IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void TestAccessToListItems()
        {
            page.InputWithoutTidList[0].IsPresent.Wait().That(Is.True);
            page.InputWithoutTidList[1].IsPresent.Wait().That(Is.True);
            page.InputWithoutTidList[2].IsPresent.Wait().That(Is.True);
        }

        [Test]
        public void Test_ControlsListWithRootTid()
        {
            page.CompositeReadonlyElementListCase.Count.Wait().That(Is.EqualTo(3));
            page.CompositeReadonlyElementListCase[0].Value1.Text.Wait().That(Is.EqualTo("Value 11"));
            page.CompositeReadonlyElementListCase[0].Value2.Text.Wait().That(Is.EqualTo("Value 12"));
            page.CompositeReadonlyElementListCase[1].Value1.Text.Wait().That(Is.EqualTo("Value 21"));
            page.CompositeReadonlyElementListCase[1].Value2.Text.Wait().That(Is.EqualTo("Value 22"));
            page.CompositeReadonlyElementListCase[2].Value1.Text.Wait().That(Is.EqualTo("Value 31"));
            page.CompositeReadonlyElementListCase[2].Value2.Text.Wait().That(Is.EqualTo("Value 32"));
        }

        [Test]
        public void Test_ControlsListWithRootTid_Selector()
        {
            page.CompositeReadonlyElementListCase.GetAbsolutePathBySelectors().Should().Be("Case ##CompositeReadonlyElementList");
            page.CompositeReadonlyElementListCase[1].Value1.GetAbsolutePathBySelectors().Should().Be("Case ##CompositeReadonlyElementList ##Item[1] ##Value1");
        }

        [Test]
        public void Test_ControlsListWithoutRootTid()
        {
            page.NoRootTidList.RootWithoutTid.Count.Wait().That(Is.EqualTo(3));
            page.NoRootTidList.RootWithoutTid[0].Value1.Text.Wait().That(Is.EqualTo("NoRoot Value 11"));
            page.NoRootTidList.RootWithoutTid[0].Value2.Text.Wait().That(Is.EqualTo("NoRoot Value 12"));
            page.NoRootTidList.RootWithoutTid[1].Value1.Text.Wait().That(Is.EqualTo("NoRoot Value 21"));
            page.NoRootTidList.RootWithoutTid[1].Value2.Text.Wait().That(Is.EqualTo("NoRoot Value 22"));
            page.NoRootTidList.RootWithoutTid[2].Value1.Text.Wait().That(Is.EqualTo("NoRoot Value 31"));
            page.NoRootTidList.RootWithoutTid[2].Value2.Text.Wait().That(Is.EqualTo("NoRoot Value 32"));
        }

        [Test]
        public void Test_ControlsListWithoutRootTid_Selector()
        {
            page.NoRootTidList.GetAbsolutePathBySelectors().Should().Be("##NoRootTidList");
            page.NoRootTidList.RootWithoutTid.GetAbsolutePathBySelectors().Should().Be("##NoRootTidList ::local");
            page.NoRootTidList.RootWithoutTid[0].Value1.GetAbsolutePathBySelectors().Should().Be("##NoRootTidList ::local ##Item[0] ##Value1");
        }

        [Test]
        public void TestCheckCount()
        {
            page.InputWithoutTidList.Count.Wait().EqualTo(3);
        }

        [Test]
        public void TestItems()
        {
            page.InputWithoutTidList[1].ClearAndInputText("value 1");
            // TODO
            page.InputWithoutTidList.Select(x => x.Value).Wait().That(Has.Some.EqualTo("value 1"));

            // control.Items.Select(x => x.Text.Get()).Wait().That(Has.Member("expected"));
            // control.Items.Wait().Single(x => x.Text.That(Is.EqualTo("expected")));
            // control.Items.Count.Wait().That(Is.EqualTo(9));
        }

        [Test]
        public void Test1()
        {
            page.InputWithoutTidList[1].ClearAndInputText("value 1");
            Following.CodeFails(() =>
            {
                page.InputWithoutTidList
                    .Select(x => x.Value)
                    .Wait()
                    .That(Has.All.EqualTo("value"));
            });
        }

        [Test]
        public void Test2()
        {
            Following.CodeFails(() =>
            {
                page.InputWithoutTidList
                    .Select(x => x.Value)
                    .Wait()
                    .That(Has.All.EqualTo("value"));
            });
        }

        [Test]
        public void Test3()
        {
            Following.CodeFails(() =>
            {
                page.InputWithoutTidList
                    .Select(x => x.Value)
                    .Wait()
                    .That(Is.EquivalentTo(new[]
                    {
                        "",
                        "value",
                        "value 2"
                    }));
            });
        }

        [Test]
        public void Test_AnyOfHaveValue_ErrorMessage()
        {
            page.InputWithoutTidList[1].ClearAndInputText("value 1");
            page.InputWithoutTidList[2].ClearAndInputText("value 3");
            // TODO
            // Following
            //     .Code(() => page.InputWithoutTidList.ExpectTo().AnyItem().ExpectTo().HaveProperty(x => x.Value, "value").EqualTo("value 2"))
            //     .ShouldThrow<AssertionException>()
            //     .Which.Message.Should().Be(
            //         To.Text(
            //             @"ControlList`1(##InputWithoutTidList): для одного из Input поле value ожидалось равным:",
            //             @"  'value 2', но было:",
            //             @"  [",
            //             @"    '',",
            //             @"    'value 1',",
            //             @"    'value 3',",
            //             @"  ]",
            //             @"Время ожидания: 2 секунды."));
        }

        [Test]
        public void Test_AnyOfHaveValueMatches_ErrorMessage()
        {
            page.InputWithoutTidList[1].ClearAndInputText("value 1");
            page.InputWithoutTidList[2].ClearAndInputText("value 3");
            // TODO
            // Following
            //    .Code(() => page.InputWithoutTidList.ExpectTo().AnyItem().ExpectTo().HaveProperty(x => x.Value, "value").MatchToRegex(new Regex(@"^\d+$")))
            //    .ShouldThrow<AssertionException>()
            //    .Which.Message.Should().Be(
            //        To.Text(
            //            @"ControlList`1(##InputWithoutTidList): для одного из Input поле value ожидалось соотвествующим regex-у:",
            //            @"  '^\d+$', но было:",
            //            @"  [",
            //            @"    '',",
            //            @"    'value 1',",
            //            @"    'value 3',",
            //            @"  ]",
            //            @"Время ожидания: 2 секунды."));
        }

        [Test]
        public void Test_AnyOfHaveValueNotEqual_ErrorMessage()
        {
            page.InputWithoutTidList[0].ClearAndInputText("value 1");
            page.InputWithoutTidList[1].ClearAndInputText("value 1");
            page.InputWithoutTidList[2].ClearAndInputText("value 1");
            // TODO
            //Following
            //    .Code(() => page.InputWithoutTidList.ExpectTo().AnyItem().ExpectTo().HaveProperty(x => x.Value, "value").Not().EqualTo("value 1"))
            //    .ShouldThrow<AssertionException>()
            //    .Which.Message.Should().Be(
            //        To.Text(
            //            @"ControlList`1(##InputWithoutTidList): для одного из Input поле value ожидалось не равным:",
            //            @"  'value 1', но было:",
            //            @"  [",
            //            @"    'value 1',",
            //            @"    'value 1',",
            //            @"    'value 1',",
            //            @"  ]",
            //            @"Время ожидания: 2 секунды."
            //            ));
        }

        [Test]
        [DefaultWaitInterval(500)]
        public void TestAllItemsEquivalentTo()
        {
            page.InputWithoutTidList[0].ClearAndInputText("value 1");
            page.InputWithoutTidList[1].ClearAndInputText("value 2");
            page.InputWithoutTidList[2].ClearAndInputText("value 3");

            // TODO
            //page.InputWithoutTidList.ExpectTo().AllItemsEquivalentTo(x => x.Value, new[]
            //    {
            //        "value 3",
            //        "value 2",
            //        "value 1",
            //    });

            //Following
            //    .Code(() => page.InputWithoutTidList.ExpectTo().AllItemsEquivalentTo(x => x.Value, new[]
            //        {
            //            "value 4",
            //            "value 5",
            //            "value 6",
            //        }))
            //    .ShouldThrow<AssertionException>();
        }

        [Test]
        public void Test_NotFoundListDuringItemAssert_ErrorMessage()
        {
            // TODO
            //Following
            //    .Code(() => page.NotExistentList.ExpectTo().AnyItem().ExpectTo().HaveProperty(x => x.Value, "value").Not().EqualTo("value 1"))
            //    .ShouldThrow<AssertionException>()
            //    .Which.Message.Should().Be(
            //        To.Text(
            //            @"ControlList`1(##NotExistentList): для одного из Input поле value ожидалось не равным:",
            //            @"  'value 1', но не был найден контрол ControlList`1(##NotExistentList)",
            //            @"Время ожидания: 2 секунды."));
        }

        private ListsTestPage page;
    }
}
