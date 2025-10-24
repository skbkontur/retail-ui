using System;
using Kontur.Selone.Extensions;
using Kontur.Selone.WebDrivers;
using System.Drawing;

using NUnit.Framework;


using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

using SKBKontur.ValidationTests.Infrastructure;

[assembly : Parallelizable(ParallelScope.Children)]
[assembly : LevelOfParallelism(1)]

namespace SKBKontur.ValidationTests
{
    [SetUpFixture]
    public class AssemblySetUpFixture
    {
      [OneTimeSetUp]
      public void SetUp()
      {
            var wdHub = "https://grid.skbkontur.ru/common/wd/hub";
            ChromeOptions options = new ChromeOptions();

            options.AddAdditionalOption(CapabilityType.Platform, "windows");
            options.AddAdditionalOption("maxDuration", 10800);
            options.AddAdditionalOption("se:teamname", "front_infra");

            WebDriver = new RemoteWebDriver(new Uri(wdHub),
                options.ToCapabilities(),
                TimeSpan.FromMinutes(5));
            WebDriver.Manage().Window.Size = new Size(1280, 1024);
      }

      [OneTimeTearDown]
      public void TearDown()
      {
            WebDriver.Dispose();
      }

      public static WebDriverPool WebDriverPool { get; private set; }
      public static WebDriver WebDriver { get; private set; }

    }
}
