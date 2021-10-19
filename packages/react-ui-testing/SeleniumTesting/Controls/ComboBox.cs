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

        public Label NotFound => new Label(GetItemsContainer(), new UniversalSelector("##ComboBoxMenu__notFound"));

        public IProp<string> SelectedValue => this.Find<Label>().ByTid("InputLikeText__input").Text;

        public IProp<string> InputValue => ValueFromElement(
            x => ExecuteScript("return arguments[0].value", x.FindElement(By.CssSelector("input"))) as string);

        public IProp<string> Text => GetText();

        private IProp<string> GetText()
        {
            try
            {
                Search(new BySelector(By.CssSelector("[data-comp-name~='InputLikeText']")));
                return SelectedValue;
            }
            catch(NoSuchElementException)
            {
                try
                {
                    Search(new BySelector(By.CssSelector("[data-comp-name~='Input']")));
                    return InputValue;
                }
                catch(NoSuchElementException)
                {
                    Search(new BySelector(By.CssSelector("label > span")));
                    return InputValue;
                }
            }
        }

        public ControlListBase<T> GetItemsAs<T>(Func<ISearchContainer, ISelector, T> itemCreator) where T : ControlBase
        {
            var itemsContainer = GetItemsContainer();
            return new ControlListBase<T>(itemsContainer, new UniversalSelector("##ComboBoxMenu__items"), new UniversalSelector("##ComboBoxMenu__item"), itemCreator);
        }

        public void InputTextAndSelectSingle(string inputText, Timings timings = null)
        {
            InputText(inputText);
            DoWithItems((x, y) => new Label(x, y), items =>
            {
                items.Count.Wait().That(x => x.AssertEqualTo(1), timings);
                var result = items.First();
                result?.Click();
            });
        }

        public void DoWithItems<T>(Func<ISearchContainer, ISelector, T> itemCreator, Action<ControlListBase<T>> action, Timings timings = null) where T : ControlBase
        {
            var collection = GetItemsAs(itemCreator);
            collection.IsPresent.Wait().That(x => x.AssertEqualTo(true), timings);
            action(collection);
        }

        public void InputTextAndSelectFirst(string inputText, Timings timings = null)
        {
            InputText(inputText);
            DoWithItems((x, y) => new Label(x, y), items =>
            {
                items.Count.Wait().That(x => x.AssertGreaterThan(0), timings);
                var result = items.First();
                result?.Click();
            }, timings);
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
                var renderContainer =
                    container.SearchGlobal(
                        new BySelector(By.CssSelector($"[data-rendered-container-id='{renderContainerId}']")));
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

        public ISearchContainer GetItemsContainer()
        {
            return GetReactProp<bool>("disablePortal") ? (ISearchContainer) this : portal;
        }

        protected Portal portal;
    }
}
