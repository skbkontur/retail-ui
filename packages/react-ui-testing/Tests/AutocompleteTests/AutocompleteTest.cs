using NUnit.Framework;
using SKBKontur.SeleniumTesting.Tests.Helpers;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.AutocompleteTests
{
    [DefaultWaitInterval(2000)]
    public class AutocompleteTest : TestBase
    {
        public AutocompleteTest(string reactVersion, string retailUiVersion)
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
            page.ListBasedAutocomplete.Suggestions.Wait().EqualTo(new[] {"Grey Face", "Grey Space"});
        }

        [Test]
        public void TestFetchBasedSuggestions()
        {
            page.FetchBasedAutocomplete.InputText("Grey");
            page.FetchBasedAutocomplete.Suggestions.Wait().EqualTo(new[] {"Grey Face", "Grey Space"});
        }

        [Test]
        public void TestNoOptionSuggestions()
        {
            page.ListBasedAutocomplete.InputText("Gray");
            page.ListBasedAutocomplete.Suggestions.Wait().That(Is.Empty);
        }

        [Test]
        public void TestSuggestionSelection()
        {
            page.ListBasedAutocomplete.InputText("Grey");
            page.ListBasedAutocomplete.SelectByIndex(0);
            page.ListBasedAutocomplete.Text.Wait().That(Is.EqualTo("Grey Face"));
        }

        [Test]
        public void TestDelayedAutocompleteSuggestions()
        {
            page.DelayedFetchBasedAutocomplete.InputText("Grey");
            page.DelayedFetchBasedAutocomplete.Suggestions.Wait().EqualTo(new[] {"Grey Face", "Grey Space"});
        }

        private AutocompleteTestPage page;
    }
}