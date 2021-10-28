using System;

using NUnit.Framework;
using NUnit.Framework.Interfaces;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class DefaultWaitIntervalAttribute : TestActionAttribute
    {
        public DefaultWaitIntervalAttribute(double milliseconds)
        {
            defaultWaitInterval = TimeSpan.FromMilliseconds(milliseconds);
        }

        public override ActionTargets Targets { get { return ActionTargets.Test; } }

        public override void BeforeTest(ITest test)
        {
            base.BeforeTest(test);
            previousWaitInterval = AssertionsContext.GetDefaultWaitInterval();
            AssertionsContext.SetDefaultWaitInterval(defaultWaitInterval);
        }

        public override void AfterTest(ITest test)
        {
            AssertionsContext.SetDefaultWaitInterval(previousWaitInterval);
            base.AfterTest(test);
        }

        private readonly TimeSpan defaultWaitInterval;
        private TimeSpan previousWaitInterval;
    }
}
