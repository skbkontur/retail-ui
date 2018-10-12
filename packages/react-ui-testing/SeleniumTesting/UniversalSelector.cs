using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.RegularExpressions;

using OpenQA.Selenium;
using OpenQA.Selenium.Internal;

namespace SKBKontur.SeleniumTesting
{
    public class ViaPortalBy : By
    {
        public ViaPortalBy(By portalSelector, By afterPortalSelector)
        {
            this.portalSelector = portalSelector;
            this.afterPortalSelector = afterPortalSelector;
        }

        public override IWebElement FindElement(ISearchContext context)
        {
            var portalContainer = context.FindElement(portalSelector);
            var renderContainerId = portalContainer.GetAttribute("data-render-container-id");
            var portal = GetGlobalContext(context).FindElement(CssSelector($"[data-rendered-container-id='{renderContainerId}']"));
            return portal.FindElement(afterPortalSelector);
        }

        private ISearchContext GetGlobalContext(ISearchContext context)
        {
            if(context is IWrapsDriver)
            {
                return (context as IWrapsDriver).WrappedDriver;
            }
            if(context is IWebDriver)
            {
                return context;
            }
            throw new InvalidOperationException($"Cannot extract global context from object of type {context.GetType().FullName}");
        }

        public override ReadOnlyCollection<IWebElement> FindElements(ISearchContext context)
        {
            var portalContainer = context.FindElement(portalSelector);
            var renderContainerId = portalContainer.GetAttribute("data-render-container-id");
            var portal = GetGlobalContext(context).FindElement(CssSelector($"[data-rendered-container-id='{renderContainerId}']"));
            return portal.FindElements(afterPortalSelector);
        }

        private readonly By portalSelector;
        private readonly By afterPortalSelector;
    }

    public class UniversalSelector : ISelector
    {
        public UniversalSelector(string selectorString)
        {
            this.selectorString = selectorString;
        }

        public static implicit operator UniversalSelector(string selectorString)
        {
            return new UniversalSelector(selectorString);
        }

        public By SeleniumBy
        {
            get
            {
                if(selectorString.Contains(":portal"))
                {
                    var a = selectorString.Split(new[] {":portal "}, StringSplitOptions.None);
                    return new ViaPortalBy(
                        By.CssSelector(ConvertUniversalSelectorToCssSelector(a[0])),
                        By.CssSelector(ConvertUniversalSelectorToCssSelector(a[1])));
                }
                if(selectorString == "::local")
                    return By.XPath(".");
                return By.CssSelector(ConvertUniversalSelectorToCssSelector(selectorString));
            }
        }

        public static string ConvertUniversalSelectorToCssSelector(string universalSelector)
        {
            var selectorParts = universalSelector.Split(' ');
            return string.Join(" ", selectorParts.Select(ConvertSelectorPartToCssSelector));
        }

        private static string ConvertSelectorPartToCssSelector(string universalSelector)
        {
            var regexp = new Regex(@"((##\(.*?\))|##([^\.\[\]#\']+))|(\.([^\.\[\]#\']+))|(\[.*?\])|([^\.\[\]#\']+)");
            return regexp.Replace(universalSelector, x =>
                {
                    var part = x.Value;
                    if(part.StartsWith("##"))
                    {
                        return $"[data-tid~='{part.Replace("##", "").Replace("(", "").Replace(")", "")}']";
                    }
                    if(IsComponentNameSelector(part))
                    {
                        return $"[data-comp-name~='{part}']";
                    }
                    return part;
                });
        }

        public override string ToString()
        {
            return selectorString;
        }

        private static bool IsComponentNameSelector(string improvedSelector)
        {
            return char.IsLetter(improvedSelector[0]) && improvedSelector[0].ToString().ToUpper() == improvedSelector[0].ToString();
        }

        private string GetSingleTid()
        {
            var selectorParts = selectorString.Split(' ');
            if(selectorParts.Length == 1 && selectorParts[0].StartsWith("##"))
            {
                return selectorParts[0].Replace("##", "");
            }
            return null;
        }

        public bool MatchElement(IWebElement cachedContext)
        {
            var singleTid = GetSingleTid();
            if(singleTid != null)
            {
                var tidAttributeValue = cachedContext.GetAttribute("data-tid");
                if(tidAttributeValue != null)
                {
                    return tidAttributeValue.Split(' ').Contains(singleTid);
                }
                return false;
            }
            return true;
        }

        private readonly string selectorString;
    }
}