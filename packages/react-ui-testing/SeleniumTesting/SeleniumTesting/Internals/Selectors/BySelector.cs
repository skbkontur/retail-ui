using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Internals.Selectors
{
    internal class BySelector : ISelector
    {
        public BySelector(By by)
        {
            this.SeleniumBy = @by;
        }

        public override string ToString()
        {
            return SeleniumBy.ToString();
        }

        public By SeleniumBy { get; }

        public bool MatchElement(IWebElement cachedContext)
        {
            return true;
        }
    }
}