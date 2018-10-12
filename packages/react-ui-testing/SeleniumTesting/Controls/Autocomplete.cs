using System.Collections.Generic;
using System.Linq;

using JetBrains.Annotations;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Autocomplete : ControlBase
    {
        public Autocomplete(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void InputText([NotNull] string text)
        {
            ExecuteAction(x => x.FindElement(By.CssSelector("label > input")).SendKeys(text), $"InputText({text})");
        }

        [NotNull]
        public List<string> GetSuggestions()
        {
            return GetValueFromElement(x => x.FindElements(By.CssSelector("div > div > *"))).Select(x => x.Text).ToList();
        }

        public void SelectByIndex(int index)
        {
            GetValueFromElement(x => x.FindElements(By.CssSelector("div > div > *"))).Skip(index).FirstOrDefault().Click();
        }
    }
}