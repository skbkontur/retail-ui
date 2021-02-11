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
            try
            {
                Search(new BySelector(By.CssSelector("[data-tid='SidePage__close']"))).Click();
            }
            catch (NoSuchElementException)
            {
                Search(new BySelector(By.LinkText("×"))).Click();
            }
        }
    }
}
