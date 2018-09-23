using System;

namespace SKBKontur.SeleniumTesting.Tests.AutoFill
{
    public class ChildSelectorAttribute : Attribute
    {
        public ChildSelectorAttribute(string selector)
        {
            Selector = new UniversalSelector(selector);
        }

        public ISelector Selector { get; private set; }
    }
}