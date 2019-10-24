using System;
using System.Collections.Generic;
using System.Linq;

using JetBrains.Annotations;
using Kontur.Selone.Properties;
using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals;
using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class ComboBox : ControlBase
    {
        public ComboBox(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            portal = this.Find<Portal>().By("noscript");
        }

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");

        [Obsolete]
        public string Text { get { return GetValueFromElement(x => x.Text); } }

        public ControlListBase<T> GetItemsAs<T>(Func<ISearchContainer, ISelector, T> z) where T : ControlBase
        {
            return GetReactProp<bool>("disablePortal") ?
                       new ControlListBase<T>(this, new UniversalSelector("Menu"), new UniversalSelector("MenuItem"), z) :
                       new ControlListBase<T>(portal, new UniversalSelector("Menu"), new UniversalSelector("MenuItem"), z);
        }

        public void InputTextAndSelectSingle(string inputText, Timings timings = null)
        {
            Click();
            InputText(inputText);
            GetItemsAs((x, y) => new Label(x, y)).Count.Wait().That(x => x.AssertEqualTo(1), timings);
            var result = GetItemsAs((x, y) => new Label(x, y)).First();
            if(result != null)
            {
                SelectByIndex(0);
            }
        }

        public void InputTextAndSelectFirst(string inputText, Timings timings = null)
        {
            Click();
            InputText(inputText);
            GetItemsAs((x, y) => new Label(x, y)).Count.Wait().That(x => x.AssertGreaterThan(0), timings);
            var result = GetItemsAs((x, y) => new Label(x, y)).First();
            if(result != null)
            {
                SelectByIndex(0);
            }
        }

        public void InputText([NotNull] string text)
        {
            ExecuteAction(
                x =>
                    {
                        x.Click();
                        var input = x.FindElement(By.CssSelector("input"));
                        input.Clear();
                        input.SendKeys(text);
                    },
                $"InputText('{text}')");
        }

        [NotNull]
        public List<object> GetResults()
        {
            try
            {
                var renderContainer = GetRenderContainer();
                return renderContainer.FindElements(By.CssSelector($"[data-comp-name~='{"MenuItem"}']")).Select(x => (object)x.Text).ToList();
            }
            catch(NoSuchElementException)
            {
                return new List<object>();
            }
        }

        public void Clear()
        {
            ExecuteAction(
                x =>
                {
                    x.Click();
                    var input = x.FindElement(By.CssSelector("input"));
                    input.SendKeys(Keys.Control + "a");
                    input.SendKeys(Keys.Delete);
                    input.SendKeys(Keys.Tab);
                },
                "Clear"
            );
        }

        private IWebElement GetRenderContainer()
        {
            Waiter.Wait(() => GetRenderContainerInternal() != null, "Не появился RenderContainer");
            return GetRenderContainerInternal();
        }

        private IWebElement GetRenderContainerInternal()
        {
            try
            {
                if(GetReactProp<bool>("disablePortal"))
                {
                    return Search(new BySelector(By.CssSelector("[data-comp-name~=\'DropdownContainer\']")));
                }
                var noScriptElement = GetValueFromElement(x => x.FindElement(By.CssSelector("noscript")));
                var renderContainerId = noScriptElement.GetAttribute("data-render-container-id");
                var renderContainer = container.SearchGlobal(new BySelector(By.CssSelector($"[data-rendered-container-id='{renderContainerId}']")));
                return renderContainer;
            }
            catch
            {
                return null;
            }
        }

        public void SelectByIndex(int index)
        {
            var renderContainer = GetRenderContainer();
            var items = renderContainer.FindElements(By.CssSelector("[data-comp-name~='MenuItem']"));
            var item = items.ElementAt(index);
            item.Click();
        }

        protected Portal portal;
    }
}
