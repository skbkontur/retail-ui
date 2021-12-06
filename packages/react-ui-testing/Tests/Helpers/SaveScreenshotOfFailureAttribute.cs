using System;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using SKBKontur.SeleniumTesting.Tests.TestEnvironment;

namespace SKBKontur.SeleniumTesting.Tests.Helpers
{
    public class SaveScreenshotOfFailureAttribute : Attribute, ITestAction
    {
        public void BeforeTest(ITest test)
        {
        }

        public void AfterTest(ITest test)
        {
            if(TestContext.CurrentContext.Result.Outcome.Status == TestStatus.Failed)
            {
                var now = DateTime.Now;
                var context = TestContext.CurrentContext;
                ScreenshotSaver.Save(
                    BrowserSetUp.browser.GetScreenshot().AsByteArray,
                    string.Join(".", context.Test.ClassName, context.Test.Name),
                    now);
            }
        }

        public ActionTargets Targets => ActionTargets.Test;
    }
}
