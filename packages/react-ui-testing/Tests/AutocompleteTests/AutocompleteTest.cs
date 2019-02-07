using System.Linq;
using FluentAssertions;
using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.AutocompleteTests
{
    [DefaultWaitInterval(2000)]
    public class AutcompleteTest : TestBase
    {
        public AutcompleteTest(string reactVersion, string retailUiVersion)
            : base(reactVersion, retailUiVersion)
        {
        }

        [SetUp]
        public void SetUp()
        {
            page = OpenUrl("Autocomplete").GetPageAs<AutocompleteTestPage>();
        }

        [Test]
        public void TestListBasedSuggestions()
        {
            page.ListBasedAutocomplete.InputText("Grey");
            var suggestions = page.ListBasedAutocomplete.Suggestions.ToList();
            suggestions[0].Text.Wait().That(Is.EqualTo("Grey Face"));
            suggestions[1].Text.Wait().That(Is.EqualTo("Grey Space"));
        }

        [Test]
        public void TestFetchBasedSuggestions()
        {
            page.ListBasedAutocomplete.InputText("Grey");
            var suggestions = page.ListBasedAutocomplete.Suggestions.ToList();
            suggestions[0].Text.Wait().That(Is.EqualTo("Grey Face"));
            suggestions[1].Text.Wait().That(Is.EqualTo("Grey Space"));
        }

        [Test]
        public void TestNoOptionSuggestions()
        {
            page.ListBasedAutocomplete.InputText("Gray");
            page.ListBasedAutocomplete.Suggestions.ToList().Should().BeEmpty();
        }

        [Test]
        public void TestSuggestionSelection()
        {
            page.ListBasedAutocomplete.InputText("Grey");
            page.ListBasedAutocomplete.SelectByIndex(0);
            page.ListBasedAutocomplete.Text.Wait().That(Is.EqualTo("Grey Face"));
        }

        private AutocompleteTestPage page;
    }
}