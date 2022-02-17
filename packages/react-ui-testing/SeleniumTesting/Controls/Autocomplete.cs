using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;
using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Autocomplete : ControlBase
    {
        public Autocomplete(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            portal = this.Find<Portal>().By("noscript");
            menu = new Menu(portal, new UniversalSelector("Menu"));
        }

        [NotNull]
        public IProp<string> Text => ValueFromElement(x => x.FindElement(InputFieldSelector).Value().Get());

        public IProp<int> SuggestionsCount => portal.IsPresent.Transform(isPresent => isPresent ? menu.Count.Get() : 0);

        public IProp<string> GetSuggestionAt(int index)
        {
            return SuggestionsCount.Transform(count => index < count ? menu[index].Text.Get() : null);
        }

        public IProp<IEnumerable<string>> Suggestions => portal.IsPresent.Transform(isPresent => isPresent
            ? Enumerable.Range(0, menu.Count.Get()).Select(i => menu[i].Text.Get())
            : new string[0]);

        public void InputText([NotNull] string text)
        {
            ExecuteAction(x => x.FindElement(InputFieldSelector).SendKeys(text), $"InputText({text})");
        }

        private By InputFieldSelector => By.CssSelector("input");

        [NotNull]
        [Obsolete("This method has unpredictable behaviour in case of slow Autocomplete. Use Suggestions property instead")]
        public List<string> GetSuggestions()
        {
            return Suggestions.Get().ToList();
        }

        public void SelectByIndex(int index)
        {
            menu[index].Click();
        }

        private readonly Menu menu;
        private readonly Portal portal;
    }
}
