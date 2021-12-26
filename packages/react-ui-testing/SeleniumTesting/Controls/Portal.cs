using System;

using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Portal : CompoundControl
    {
        public Portal(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public IWebElement GetPortalElement()
        {
            return GetValueFromElement(x =>
                {
                    var renderContainerId = x.GetAttribute("data-render-container-id");
                    try
                    {
                        return container.SearchGlobal(new BySelector(By.CssSelector($"[data-rendered-container-id='{renderContainerId}']")));
                    }
                    catch(NoSuchElementException)
                    {
                        return null;
                    }
                });
        }

        [Obsolete]
        public override bool IsPresentObsolete
        {
            get
            {
                try
                {
                    return GetValueFromElement(x => x != null) && GetPortalElement() != null;
                }
                catch
                {
                    return false;
                }
            }
        }

        public override IWebElement Search(ISelector selector)
        {
            return GetValueFromElement(x =>
                {
                    var renderContainerId = x.GetAttribute("data-render-container-id");
                    var portal = container.SearchGlobal(new BySelector(By.CssSelector($"[data-rendered-container-id='{renderContainerId}']")));
                    return portal.FindElement(selector.SeleniumBy);
                });
        }

        public override ISearchContext ToSearchContext()
        {
            return GetPortalElement();
        }
    }
}
