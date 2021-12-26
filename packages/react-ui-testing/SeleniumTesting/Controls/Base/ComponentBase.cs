using System.Collections.ObjectModel;
using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls.Base
{
    public class ComponentBase : ISearchContext
    {
        protected ComponentBase(ISearchContext searchContext, By @by)
        {
            By = @by;
            Container = searchContext.SearchElement(@by);
        }

        public IWebElement Container { get; }
        private By By { get; }

        public IProp<bool> IsPresent => Container.Present();
        public IProp<string> Text => Container.Text();

        public IWebElement FindElement(By @by)
        {
            return Container.FindElement(by);
        }

        public ReadOnlyCollection<IWebElement> FindElements(By @by)
        {
            return Container.FindElements(by);
        }

        public void Click()
        {
            this.Container.Click();
        }
    }
}
