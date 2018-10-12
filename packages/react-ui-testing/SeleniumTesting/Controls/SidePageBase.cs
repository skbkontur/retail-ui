using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public abstract class SidePageBase: Portal
    {
        protected SidePageBase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void Close()
        {
            Search(new BySelector(By.LinkText("×"))).Click();
        }
    }
}