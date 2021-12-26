using System;
using System.Linq;
using System.Reflection;

using JetBrains.Annotations;
using Kontur.Selone.Selectors;
using Kontur.Selone.Selectors.Css;
using SKBKontur.SeleniumTesting.Controls;
using SKBKontur.SeleniumTesting.Controls.Base;

namespace SKBKontur.SeleniumTesting.Tests.AutoFill
{
    [MeansImplicitUse(ImplicitUseTargetFlags.Members)]
    public class AutoFillControlsAttribute : Attribute, IPageActionAttribute, ICompoundControlActionAttribute
    {
        public void OnInit(PageBase pageInstace)
        {
            IntializeControlBases(pageInstace);
        }

        public void OnInit(CompoundControl control)
        {
            IntializeControlBases(control);
        }

        public void OnInit(ComponentBase control)
        {
            IntializeControlBases(control);
        }

        private static void IntializeControlBases(object instance)
        {
            var type = instance.GetType();
            foreach(var propertyInfo in type.GetProperties())
            {
                if(propertyInfo.GetCustomAttributes<SkipAutoFillAttribute>().Any())
                    break;
                if(typeof(ComponentBase).IsAssignableFrom(propertyInfo.PropertyType))
                {
                    var selector =
                        propertyInfo.GetCustomAttributes<SelectorAttribute>().Select(x => x.Selector.SeleniumBy).FirstOrDefault()
                        ?? new CssBy().WithTid(propertyInfo.Name);
                    propertyInfo.SetValue(
                        instance,
                        Activator.CreateInstance(propertyInfo.PropertyType, instance, selector));
                }
                if(typeof(ControlBase).IsAssignableFrom(propertyInfo.PropertyType))
                {
                    var selector =
                        propertyInfo.GetCustomAttributes<SelectorAttribute>().Select(x => x.Selector).FirstOrDefault()
                        ?? new UniversalSelector("##" + propertyInfo.Name);
                    if(propertyInfo.PropertyType.IsGenericType && typeof(ControlList<>) == propertyInfo.PropertyType.GetGenericTypeDefinition())
                    {
                        var childSelector = propertyInfo.GetCustomAttributes<ChildSelectorAttribute>().Single().Selector;
                        propertyInfo.SetValue(
                            instance,
                            Activator.CreateInstance(propertyInfo.PropertyType, instance, selector, childSelector));
                    }
                    else
                    {
                        propertyInfo.SetValue(
                            instance,
                            Activator.CreateInstance(propertyInfo.PropertyType, instance, selector));
                    }
                }

            }
        }
    }
}
