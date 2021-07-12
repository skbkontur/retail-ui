using System;
using System.Linq;

using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Remote;
using SKBKontur.SeleniumTesting.Internals;

namespace SKBKontur.SeleniumTesting
{
    public class PageBase : ISearchContainer, IRetailUiVersionProvider
    {
        public PageBase(IWebDriver webDriver)
        {
            this.webDriver = webDriver;
            ExecuteInitAction();
        }

        private void ExecuteInitAction()
        {
            foreach(var pageActionAttribute in GetType().GetCurrentTypeAttributes<IPageActionAttribute>())
                pageActionAttribute.OnInit(this);
        }

        public IWebElement Search(ISelector selector)
        {
            return webDriver.FindElement(selector.SeleniumBy);
        }

        public IWebElement SearchGlobal(ISelector selector)
        {
            return Search(selector);
        }

        public object ExecuteScript(string script, params object[] arguments)
        {
            if(string.IsNullOrWhiteSpace(script))
                throw new ArgumentException("script");
            try
            {
                var javaScriptExecutor = (IJavaScriptExecutor) webDriver;
                javaScriptExecutor.ExecuteScript("window.callArgs = arguments", arguments);
                return javaScriptExecutor.ExecuteScript(script, arguments);
            }
            catch(StaleElementReferenceException)
            {
                throw;
            }
            catch(Exception ex)
            {
                throw new Exception($"Can't execute script \"{script}\"", ex);
            }
        }

        public virtual void WaitLoaded()
        {
            WaitControlsMarkedWithAttribute();
        }

        private void WaitControlsMarkedWithAttribute()
        {
            var propertyInfos = GetType().GetProperties().Where(prop => prop.IsDefined(typeof(LoadingCompleteAttribute), false));
            var properties = propertyInfos.Select(x => x.GetValue(this)).OfType<ControlBase>().ToArray();
            Waiter.Wait(() => properties.All(x => x.IsPresentObsolete), "Загрузка страницы");
        }

        public string GetAbsolutePathBySelectors()
        {
            return null;
        }

        public ISearchContainer GetRootContainer()
        {
            return this;
        }

        public Actions CreateWebDriverActions()
        {
            return new Actions(webDriver);
        }

        public IWebDriver DangerousGetWebDriverInstance()
        {
            return webDriver;
        }

        public virtual TPage GoTo<TPage>() where TPage : PageBase
        {
            return InitializePage<TPage>(webDriver);
        }

        public static TPage InitializePage<TPage>(IWebDriver webDriver) where TPage : PageBase
        {
            TPage page = (TPage)Activator.CreateInstance(typeof(TPage), webDriver);
            page.WaitLoaded();
            return page;
        }

        public string GetRetailUiVersion()
        {
            return ExecuteScript("return window.__RETAIL_UI_VERSION__ || ''") as string;
        }

        protected internal IWebDriver webDriver;
    }
}