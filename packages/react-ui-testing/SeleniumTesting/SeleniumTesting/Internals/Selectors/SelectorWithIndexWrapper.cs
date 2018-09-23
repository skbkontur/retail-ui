using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Internals.Selectors
{
    internal class SelectorWithIndexWrapper : ISelector
    {
        public SelectorWithIndexWrapper(ISelector selector, int index)
        {
            this.selector = selector;
            this.index = index;
        }

        public override string ToString()
        {
            return $"{selector}[{index}]";
        }

        public By SeleniumBy { get { return new ByNthOfBy(selector.SeleniumBy, index); } }

        public bool MatchElement(IWebElement cachedContext)
        {
            return true;
        }

        private readonly ISelector selector;
        private readonly int index;
    }
}