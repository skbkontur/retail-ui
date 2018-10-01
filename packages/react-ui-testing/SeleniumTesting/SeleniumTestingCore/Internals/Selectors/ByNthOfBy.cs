using System.Collections.ObjectModel;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Internals.Selectors
{
    internal class ByNthOfBy : By
    {
        internal ByNthOfBy(By by, int index)
        {
            this.by = by;
            this.index = index;
        }

        public override IWebElement FindElement(ISearchContext context)
        {
            var elements = by.FindElements(context);
            if(index < 0 || index >= elements.Count)
                throw new NoSuchElementException($"Element with by '{@by}' and index '{index}' not found (actual count='{elements.Count}')");
            return elements[index];
        }

        public override ReadOnlyCollection<IWebElement> FindElements(ISearchContext context)
        {
            var elements = by.FindElements(context);
            if(index < 0 || index >= elements.Count)
                return new ReadOnlyCollection<IWebElement>(new IWebElement[0]);
            return new ReadOnlyCollection<IWebElement>(new[] {elements[index]});
        }

        public override string ToString()
        {
            return $"ByNthOfBy: <{@by}>[{index}]";
        }

        private readonly By by;
        private readonly int index;
    }
}