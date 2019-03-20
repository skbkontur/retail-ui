using System;
using JetBrains.Annotations;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace SKBKontur.SeleniumTesting
{
    public interface IControlBase : ISearchContainer
    {
        void SendKeysToBody(string keys);
        bool HasError();
        void MouseOver();
        string GetAttributeValue(string attributeName);
        IProp<bool> IsPresent { get; }
        bool IsPresentObsolete { get; }
        bool IsFoundBySelector { get; }
        void Click();
        TResult GetValueFromElement<TResult>(Func<IWebElement, TResult> action);
        void ExecuteAction([NotNull] Action<IWebElement> action, [NotNull] string actionDescription);
        void Dangerously_WihtoutWaitForDisplayed_ExecuteAction([NotNull] Action<IWebElement> action);
        void SetClickExecutor(IControlBaseClickExecutor executor);
        IWebElement Search(ISelector selector);
        IWebElement SearchGlobal(ISelector selector);
        object ExecuteScript(string script, params object[] arguments);
        object ExecuteScript(string script, Func<IWebElement, object[]> argumentsSelector);
        string GetAbsolutePathBySelectors();
        ISearchContainer GetRootContainer();
        Actions CreateWebDriverActions();
        string GetControlTypeDesription();
        string GetNameWithSelector();
        IProp<T> ReactProperty<T>(string property, string description = null);
        IProp<T> Property<T>(Func<T> property, string description);
    }
}
