using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

using JetBrains.Annotations;

using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;

using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

using SKBKontur.SeleniumTesting.Internals;

using Waiter = SKBKontur.SeleniumTesting.Internals.Waiter;

namespace SKBKontur.SeleniumTesting
{
    public class ControlBase : Kontur.Selone.Controls.ControlBase, ISearchContainer
    {
        protected ControlBase(ISearchContainer container, ISelector selector) : base(container.GetSearchContext(), selector.SeleniumBy)
        {
            Console.WriteLine(selector.SeleniumBy);
            this.container = container;
            this.selector = selector;
            this.searchContext = container.GetSearchContext().SearchElement(selector.SeleniumBy);
        }

        protected ControlBase(ISearchContext context, By by) : base(context, by)
        {
            // todo
        }

        [Obsolete]
        public void SendKeysToBody(string keys)
        {
            container.SearchGlobal(new UniversalSelector("body")).SendKeys(keys);
        }

        public IProp<bool> HasError => ReactProperty<bool>("error");

        public IProp<bool> HasWarning => Property(() => GetReactProp<bool>("warning"), "HasWarning");

        public void MouseOver()
        {
            WrappedElement.Execute(element => element.Mouseover());
            // ExecuteAction(x =>
            //     {
            //         var actions = container.CreateWebDriverActions();
            //         actions.MoveToElement(x).Perform();
            //     }, "Mouseover()");
        }

        public string GetAttributeValue(string attributeName)
        {
            return GetValueFromElement(x => x.GetAttribute(attributeName));
        }

        public IProp<bool> IsPresent => Property(() => IsPresentObsolete, "IsPresent");

        [Obsolete]
        public virtual bool IsPresentObsolete
        {
            get
            {
                try
                {
                    return GetValueFromElement(element => element.Displayed);
                }
                catch
                {
                    return false;
                }
            }
        }

        public virtual bool IsFoundBySelector
        {
            get
            {
                try
                {
                    return GetValueFromElement(element => element != null);
                }
                catch
                {
                    return false;
                }
            }
        }

        public virtual void Click()
        {
            ExecuteAction(x => x.Click(), "Click");
        }

        public TResult GetValueFromElement<TResult>(Func<IWebElement, TResult> action)
        {
            try
            {
                return action(GetNativeElement());
            }
            catch(StaleElementReferenceException)
            {
                ClearCachedElement();
                return action(GetNativeElement());
            }
        }

        public void ExecuteAction([NotNull] Action<IWebElement> action, [NotNull] string actionDescription)
        {
            if(string.IsNullOrEmpty(actionDescription))
                throw new ArgumentException("Action description should not be null or empty", nameof(actionDescription));
            try
            {
                Waiter.Wait(() => GetNativeElement().Displayed,
                            (timeout, exception) => GetZ(timeout, actionDescription, exception),
                            (int)AssertionsContext.GetDefaultWaitInterval().TotalMilliseconds);
                action(GetNativeElement());
            }
            catch(StaleElementReferenceException)
            {
                ClearCachedElement();
                action(GetNativeElement());
            }
        }

        public void Dangerously_WihtoutWaitForDisplayed_ExecuteAction([NotNull] Action<IWebElement> action)
        {
            try
            {
                action(GetNativeElement());
            }
            catch(StaleElementReferenceException)
            {
                ClearCachedElement();
                action(GetNativeElement());
            }
        }

        private string GetZ(int timeout, string actionDescription, Exception exception)
        {
            var result = new StringBuilder();
            result.AppendLine(
                $"{GetControlTypeDesription()}({GetAbsolutePathBySelectors()}): требовалось действие {actionDescription}, но");
            if(exception is ElementNotFoundException)
            {
                var notFoundException = exception as ElementNotFoundException;
                result.AppendLine(
                    $"  не смогли долждаться присутствия элемента: {notFoundException.Control.GetControlTypeDesription()}({notFoundException.Control.GetAbsolutePathBySelectors()})");
                result.AppendLine($"Время ожидания: {timeout} ms.");
            }
            else
            {
                result.AppendLine(
                    $"  не смогли дождаться присутствия элемента (время ожидания: {timeout} ms), т.к. было получено исключение:");
                result.AppendLine(exception?.ToString() ?? "exception is null");
            }

            return result.ToString();
        }

        internal void ClearCachedElement()
        {
            cachedContext = null;
        }

        protected T GetReactProp<T>(string propName)
        {
            var propValue = GetValueFromElement(x => x.GetAttribute($"data-prop-{propName}"));
            if(typeof(T) == typeof(string))
            {
                return (T)(object)propValue;
            }

            if(string.IsNullOrEmpty(propValue))
            {
                return default(T);
            }

            return SimpleJson.SimpleJson.DeserializeObject<T>(propValue);
        }

        [NotNull]
        private IWebElement GetNativeElement()
        {
            try
            {
                if(cachedContext != null)
                {
                    if(!selector.MatchElement(cachedContext))
                    {
                        ClearCachedElement();
                        Console.WriteLine("Cached element cleared for {0}", selector);
                    }
                }

                return (cachedContext ?? (cachedContext = container.Search(selector)));
            }
            catch(NoSuchElementException ex)
            {
                throw new ElementNotFoundException(this, container, GetType(), selector, ex);
            }
        }

        public virtual IWebElement Search(ISelector selector)
        {
            return WrappedElement.FindElement(selector.SeleniumBy);
            return GetValueFromElement(x => x.FindElement(selector.SeleniumBy));
        }

        public IWebElement SearchGlobal(ISelector selector)
        {
            return container.SearchGlobal(selector);
        }

        public object ExecuteScript(string script, params object[] arguments)
        {
            return GetValueFromElement(x => container.ExecuteScript(script, arguments));
        }

        public object ExecuteScript(string script, Func<IWebElement, object[]> argumentsSelector)
        {
            return GetValueFromElement(x => container.ExecuteScript(script, argumentsSelector(x)));
        }

        [NotNull]
        public string GetAbsolutePathBySelectors()
        {
            return string.Join(
                " ",
                new[] {container.GetAbsolutePathBySelectors(), selector.ToString()}
                    .Where(x => x != null)
                );
        }

        public ISearchContainer GetRootContainer()
        {
            return container.GetRootContainer();
        }

        public Actions CreateWebDriverActions()
        {
            return container.CreateWebDriverActions();
        }

        public virtual ISearchContext GetSearchContext()
        {
            return searchContext;
        }

        public string GetControlTypeDesription()
        {
            return GetType().Name;
        }

        [CanBeNull]
        protected string GetRetailUiVersion()
        {
            return (GetRootContainer() as IRetailUiVersionProvider)?.GetRetailUiVersion();
        }

        protected bool IsRetailUiVersionSatisfy(string expectedRange)
        {
            return GetRetailUiVersion().IsVersionSatisfy(expectedRange);
        }

        public string GetNameWithSelector()
        {
            return $"{GetControlTypeDesription()}({GetAbsolutePathBySelectors()})";
        }

        protected IProp<string> TextProperty(string description = null)
        {
            return Property(() => GetValueFromElement(element => element.Text), description ?? "text");
        }

        protected IProp<T> ValueFromElement<T>(Func<IWebElement, T> action, string description = null)
        {
            return Property(() => GetValueFromElement(action), description ?? "text");
        }

        protected IProp<T> ReactProperty<T>(string property, string description = null)
        {
            return Property(() => GetReactProp<T>(property), description ?? $"ReactProperty: '{property}'");
        }

        protected IProp<T> Property<T>(Func<T> property, string description)
        {
            return Prop.Create(property, FormatDescription(description));
        }

        protected string FormatDescription(string description)
        {
            return $"{GetNameWithSelector()} {description}";
        }

        private IWebElement cachedContext;
        private readonly ISelector selector;
        private readonly ISearchContext searchContext;
        protected readonly ISearchContainer container;
        public IWebElement FindElement(By @by)
        {
            return WrappedElement.SearchElement(by);
            throw new NotImplementedException();
        }

        public ReadOnlyCollection<IWebElement> FindElements(By @by)
        {
            return WrappedElement.FindElements(by);
            throw new NotImplementedException();
        }
    }
}
