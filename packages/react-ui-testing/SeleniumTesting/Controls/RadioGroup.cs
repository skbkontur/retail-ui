using System;
using System.Collections.Generic;
using System.Linq;

using JetBrains.Annotations;

using OpenQA.Selenium;

using SimpleJson;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class RadioGroup : ControlBase
    {
        public RadioGroup(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        [Obsolete]
        public void SelectItem(object v)
        {
            SelectItemById(v.ToString());
        }

        [Obsolete]
        public string GetSelectedItem()
        {
            return GetSelectedItemId();
        }

        public void SelectItemById([NotNull] string id)
        {
            ExecuteAction(element =>
                {
                    var items = GetReactProp<JsonArray>("items");
                    var index = items.ToList().FindIndex(x => ElementMatchToValue(id, x));
                    element.FindElements(By.CssSelector($"[data-comp-name~='{"Radio"}']")).ElementAt(index).Click();
                }, $"SelectItemById({id})");
        }

        private static bool ElementMatchToValue(object value, object x)
        {
            object actualValue = null;
            if(x is JsonArray)
            {
                actualValue = (x as JsonArray)[0];
            }
            else
            {
                actualValue = x;
            }
            if(actualValue == null)
            {
                return value == null;
            }
            return
                actualValue.Equals(value) ||
                actualValue.ToString().Equals(value.ToString()) ||
                actualValue.ToString().ToLower().Equals(value.ToString().ToLower());
        }

        [CanBeNull]
        public string GetSelectedItemId()
        {
            return GetReactProp<string>("value");
        }

        [NotNull]
        public List<string> GetItems()
        {
            return GetReactProp<object[][]>("items").Select(x => x[0].ToString()).ToList();
        }
    }
}
