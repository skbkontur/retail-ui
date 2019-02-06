using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;
using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Internals;

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
        public IProp<string> Text => ValueFromElement(x =>
        {
            return x.FindElement(By.CssSelector("label > span > input")).Value().Get();
        });

        public void InputText([NotNull] string text)
        {
            ExecuteAction(x => x.FindElement(By.CssSelector("label > span > input")).SendKeys(text),
                $"InputText({text})");
        }

        [NotNull]
        public List<MenuItem> GetSuggestions()
        {
            try
            {
                return menu.AsEnumerable().ToList();
            }
            catch (ElementNotFoundException)
            {
                return new List<MenuItem>();
            }
        }

        public void SelectByIndex(int index)
        {
            menu[index].Click();
        }

        private readonly Menu menu;
        private readonly Portal portal;
    }
}