using System.Collections.Concurrent;

using NUnit.Framework;

using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class TestBase
    {
        private static string TestWorkerId => TestContext.CurrentContext.WorkerId;

        [TearDown]
        public void TearDown()
        {
            if(acquiredWebDrivers.TryRemove(TestWorkerId, out var webDriver))
            {
                AssemblySetUpFixture.WebDriverPool.Release(webDriver);
            }
        }

        protected static RemoteWebDriver GetWebDriver()
        {
            return acquiredWebDrivers.GetOrAdd(TestWorkerId, x => AssemblySetUpFixture.WebDriverPool.Acquire()) as RemoteWebDriver;
        }

        private static readonly ConcurrentDictionary<string, IWebDriver> acquiredWebDrivers = new ConcurrentDictionary<string, IWebDriver>();
    }
}
