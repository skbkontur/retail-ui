using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public abstract class ModalBase : Portal
    {
        protected ModalBase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void Close()
        {
            try
            {
                Search(new BySelector(By.CssSelector("[data-comp-name~='ModalHeader'] div > button"))).Click();
            }
            catch (NoSuchElementException)
            {
                try
                {
                    Search(new BySelector(By.CssSelector("[data-comp-name~='Header'] div > button"))).Click();
                }
                catch (NoSuchElementException)
                {
                    Search(new BySelector(By.LinkText("×"))).Click();
                }
            }
        }
    }
}
