using OpenQA.Selenium.Remote;

using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Tests.AutoFill;

namespace SKBKontur.SeleniumTesting.Tests.AutocompleteTests
{
    [AutoFillControls]
    public class AutocompleteTestPage : PageBase
    {
        public AutocompleteTestPage(RemoteWebDriver webDriver)
            : base(webDriver)
        {
        }

        public Autocomplete ListBasedAutocomplete { get; private set; }
        public Autocomplete FetchBasedAutocomplete { get; private set; }
        public Autocomplete DelayedFetchBasedAutocomplete { get; private set; }
    }
}