using System;
using System.Collections.Generic;

namespace SKBKontur.SeleniumTesting.Tests.PageActionAttributesTests.PageActionAttributes
{
    public class TestPageActionAttribute : Attribute, IPageActionAttribute
    {
        public TestPageActionAttribute(string actionName)
        {
            this.actionName = actionName;
        }

        public void OnInit(PageBase pageInstace)
        {
            executedActions.Add(actionName);
        }

        private readonly string actionName;
        public static List<string> executedActions = new List<string>();
    }
}