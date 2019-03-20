using System;
using System.Linq;
using System.Text;

using JetBrains.Annotations;

using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;

using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

using SKBKontur.SeleniumTesting.Assertions.Context;
using SKBKontur.SeleniumTesting.Internals;

using Waiter = SKBKontur.SeleniumTesting.Assertions.Waiter;

namespace SKBKontur.SeleniumTesting
{
    public class ControlBase : ISearchContainer
    {
        public ControlBase(ISearchContainer container, ISelector selector)
        {
            Container = container;
            Selector = selector;
        }

        [Obsolete]
        public void SendKeysToBody(string keys)
        {
            Container.SearchGlobal(new UniversalSelector("body")).SendKeys(keys);
        }

        public bool HasError()
        {
            return GetReactProp<bool>("error");
        }

        public IProp<bool> HasWarning => Property(() => GetReactProp<bool>("warning"), "HasWarning");

        public void MouseOver()
        {
            ExecuteAction(x =>
                {
                    var actions = Container.CreateWebDriverActions();
                    actions.MoveToElement(x).Perform();
                }, "Mouseover()");
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

        public IProp<bool> IsEnabled => Property(() =>
        {
            try
            {
                return GetValueFromElement(element => element.Enabled);
            }
            catch
            {
                return false;
            }
        }, "IsEnabled");

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
            if (customClickExecutor != null)
            {
                customClickExecutor.Click(this);
                return;
            }

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
                throw new ArgumentException("Action description should not be null or empty", "actionDescription");
            try
            {
                Waiter.Wait(() => GetNativeElement().Displayed, (timeout, exception) => GetZ(timeout, actionDescription, exception), AssertionsContext.GetDefaultWaitInterval());
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

        private string GetZ(TimeSpan timeout, string actionDescription, Exception exception)
        {
            var result = new StringBuilder();
            result.AppendLine($"{GetControlTypeDesription()}({GetAbsolutePathBySelectors()}): требовалось действие {actionDescription}, но");
            if(exception is ElementNotFoundException)
            {
                var notFountException = exception as ElementNotFoundException;
                result.AppendLine($"  не смогли дождаться присутствия элемента: {notFountException.Control.GetControlTypeDesription()}({notFountException.Control.GetAbsolutePathBySelectors()})");
                result.AppendLine($"Время ожидания: {(int)timeout.TotalMilliseconds}ms.");
            }
            else
            {
                result.AppendLine($"  не смогли дождаться присутствия элемента (время ожидания: {(int)timeout.TotalMilliseconds}ms), т.к. было получено исключение:");
                result.AppendLine(exception.ToString());
            }
            return result.ToString();
        }

        internal void ClearCachedElement()
        {
            cachedContext = null;
        }

        public void SetClickExecutor(IControlBaseClickExecutor executor)
        {
            customClickExecutor = executor;
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
                    if(!Selector.MatchElement(cachedContext))
                    {
                        ClearCachedElement();
                        Console.WriteLine("Cached element cleared for {0}", Selector);
                    }
                }
                return (cachedContext ?? (cachedContext = Container.Search(Selector)));
            }
            catch(NoSuchElementException ex)
            {
                throw new ElementNotFoundException(this, Container, GetType(), Selector, ex);
            }
        }

        public virtual IWebElement Search(ISelector selector)
        {
            return GetValueFromElement(x => x.FindElement(selector.SeleniumBy));
        }

        public IWebElement SearchGlobal(ISelector selector)
        {
            return Container.SearchGlobal(selector);
        }

        public object ExecuteScript(string script, params object[] arguments)
        {
            return GetValueFromElement(x => Container.ExecuteScript(script, arguments));
        }

        public object ExecuteScript(string script, Func<IWebElement, object[]> argumentsSelector)
        {
            return GetValueFromElement(x => Container.ExecuteScript(script, argumentsSelector(x)));
        }

        [NotNull]
        public string GetAbsolutePathBySelectors()
        {
            return string.Join(
                " ",
                new[] {Container.GetAbsolutePathBySelectors(), Selector.ToString()}
                    .Where(x => x != null)
                );
        }

        public ISearchContainer GetRootContainer()
        {
            return Container.GetRootContainer();
        }

        public Actions CreateWebDriverActions()
        {
            return Container.CreateWebDriverActions();
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

        public IProp<T> ReactProperty<T>(string property, string description = null)
        {
            return Property(() => GetReactProp<T>(property), description ?? $"ReactProperty: '{property}'");
        }

        public IProp<T> Property<T>(Func<T> property, string description)
        {
            return Prop.Create(property, FormatDescription(description));
        }

        protected string FormatDescription(string description)
        {
            return $"{GetNameWithSelector()} {description}";
        }

        private IWebElement cachedContext;
        private IControlBaseClickExecutor customClickExecutor;
        public readonly ISelector Selector;
        public readonly ISearchContainer Container;
    }
}