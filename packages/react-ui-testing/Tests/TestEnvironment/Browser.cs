using System;
using System.Drawing;
using System.Linq;
using System.IO;
using Kontur.Selone.Extensions;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using SKBKontur.SeleniumTesting.Internals.Commons;

namespace SKBKontur.SeleniumTesting.Tests.TestEnvironment
{
    public class Browser
    {
        public Browser(string defaultDomain, string defaultPort, string tunnelIdentifier)
        {
            this.defaultDomain = defaultDomain;
            this.defaultPort = defaultPort;
            this.tunnelIdentifier = tunnelIdentifier;
        }

        public void Dispose()
        {
            WebDriver.Dispose();
        }

        public T GetPageAs<T>() where T : PageBase
        {
            return PageBase.InitializePage<T>(WebDriver);
        }

        public Browser OpenUrl(string url)
        {
            try
            {
                WebDriver.Navigate().GoToUrl(GetAbsoluteUrl(url));
                WebDriver.Manage().Cookies.AddCookie(new Cookie("testingMode", "1"));
                return this;
            }
            catch (Exception ex)
            {
                throw new Exception($"Can't open page with url={url}\r\n" + ex.Message);
            }
        }

        public string GetCurrentUrl()
        {
            return WebDriver.Url;
        }

        public void SaveScreenshot(string testName)
        {
            var screenshot = GetScreenshot();
            if (screenshot == null)
                throw new Exception("Can't take screenshot");
            ScreenshotSaver.Save(screenshot.AsByteArray, testName, DateTime.Now);
        }

        public Screenshot GetScreenshot()
        {
            return WebDriver.Screenshoter().GetScreenshot();
        }

        private RemoteWebDriver WebDriver
        {
            get
            {
                if (webDriver != null) return webDriver;

                if (!TravisEnvironment.IsExecutionViaTravis)
                {
                        File.ReadAllLines(Path.Combine(PathUtils.FindProjectRootFolder(), ".env"))
                            .Select(line => line.Split('='))
                            .Where(splitLine => splitLine.Length == 2)
                            .ToList()
                            .ForEach(parameters => Environment.SetEnvironmentVariable(parameters[0].Trim(), parameters[1].Trim()));
                }

                var sauceUserName = Environment.GetEnvironmentVariable("SAUCE_USERNAME", EnvironmentVariableTarget.Process);
                var sauceAccessKey = Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY", EnvironmentVariableTarget.Process);

                ChromeOptions options = new ChromeOptions();
                options.AddAdditionalCapability(CapabilityType.Version, "54", true);
                options.AddAdditionalCapability(CapabilityType.Platform, "Windows 10", true);
                options.AddAdditionalCapability("username", sauceUserName, true);
                options.AddAdditionalCapability("accessKey", sauceAccessKey, true);
                options.AddAdditionalCapability("name", TestContext.CurrentContext.Test.Name, true);
                options.AddAdditionalCapability("tunnel-identifier", this.tunnelIdentifier, true);
                options.AddAdditionalCapability("maxDuration", 10800, true);

                webDriver = new RemoteWebDriver(new Uri("http://ondemand.saucelabs.com:80/wd/hub"),
                    options.ToCapabilities(),
                    TimeSpan.FromSeconds(180));
                webDriver.Manage().Window.Size = new Size(1280, 1024);
                return webDriver;
            }
        }

        private string GetAbsoluteUrl(string relativeUrl)
        {
            if (relativeUrl.StartsWith("http://") || relativeUrl.StartsWith("https://"))
                return relativeUrl;
            return $"http://{defaultDomain}:{defaultPort}/{relativeUrl}/";
        }

        private RemoteWebDriver webDriver;
        private readonly string defaultDomain;
        private readonly string defaultPort;
        private readonly string tunnelIdentifier;
    }
}
