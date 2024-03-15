using NUnit.Framework;

using OpenQA.Selenium;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class TestBase
    {
        [SetUp]
        public virtual void SetUp()
        {
            WebDriver = AssemblySetUpFixture.WebDriverPool.Acquire();
        }

        [TearDown]
        public void TearDown()
        {
            AssemblySetUpFixture.WebDriverPool.Release(WebDriver);
        }

        protected IWebDriver WebDriver;
    }
}
