using System;

namespace SKBKontur.SeleniumTesting.Tests.AutoFill
{
    public class SelectorAttribute : Attribute
    {
        public SelectorAttribute(string selector)
        {
            Selector = new UniversalSelector(selector);
        }

        public ISelector Selector { get; private set; }
    }
}