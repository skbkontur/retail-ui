using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting
{
    public interface ISelector
    {
        By SeleniumBy { get; }
        bool MatchElement(IWebElement cachedContext);
    }
}