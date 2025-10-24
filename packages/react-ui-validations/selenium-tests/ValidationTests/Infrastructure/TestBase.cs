using System;
using System.Drawing;

using NUnit.Framework;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public abstract class TestBase
    {
        [SetUp]
        public virtual void SetUp()
        {
            WebDriver = AssemblySetUpFixture.WebDriver;
        }

        [TearDown]
        public void TearDown()
        {
            WebDriver = null;
        }

        protected IWebDriver WebDriver;
    }
}
