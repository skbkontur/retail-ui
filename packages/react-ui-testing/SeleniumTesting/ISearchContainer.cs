using JetBrains.Annotations;

using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace SKBKontur.SeleniumTesting
{
    public interface ISearchContainer : ISearchContext
    {
        [NotNull]
        IWebElement Search([NotNull] ISelector selector);

        [NotNull]
        IWebElement SearchGlobal([NotNull] ISelector selector);

        [CanBeNull]
        object ExecuteScript([NotNull] string script, [NotNull] params object[] arguments);

        [NotNull]
        string GetAbsolutePathBySelectors();

        [NotNull]
        ISearchContainer GetRootContainer();

        [NotNull]
        Actions CreateWebDriverActions();

        [NotNull]
        ISearchContext GetSearchContext();
    }
}
