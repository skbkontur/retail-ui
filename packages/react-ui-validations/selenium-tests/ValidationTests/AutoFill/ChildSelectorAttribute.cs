using System;

using SKBKontur.SeleniumTesting;

namespace SKBKontur.ValidationTests.AutoFill
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