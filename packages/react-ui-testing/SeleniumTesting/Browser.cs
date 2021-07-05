using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using Kontur.Selone.Extensions;
using Microsoft.Win32;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using SKBKontur.SeleniumTesting.Internals.Commons;

namespace SKBKontur.SeleniumTesting
{
    public class Browser : IBrowser
    {
        public Browser(string defaultDomain, string defaultPort)
        {
            this.defaultDomain = defaultDomain;
            this.defaultPort = defaultPort;
        }

        public Browser OpenUrl(string url)
        {
            try
            {
                WebDriver.Navigate().GoToUrl(GetAbsoluteUrl(url));
                WebDriver.Manage().Cookies.AddCookie(new Cookie("testingMode", "1"));
                return this;
            }
            catch(Exception ex)
            {
                throw new Exception($"Can't open page with url={url}\r\n" + ex.Message);
            }
        }

        public string GetCurrentUrl()
        {
            return WebDriver.Url;
        }

        public void Dispose()
        {
            WebDriver.Dispose();
        }

        public void SaveScreenshot(string testName)
        {
            var screenshot = GetScreenshot();
            if(screenshot == null)
                throw new Exception("Can't take screenshot");
            ScreenshotSaver.Save(screenshot.AsByteArray, testName, DateTime.Now);
        }

        public Screenshot GetScreenshot()
        {
            return WebDriver.Screenshoter().GetScreenshot();
        }

        public T GetPageAs<T>() where T : PageBase
        {
            return PageBase.InitializePage<T>(WebDriver);
        }

        private IWebDriver WebDriver
        {
            get
            {
                if (webDriver != null) return webDriver;

                var assembliesDirectory = FindAssembliesDirectory();
                var chromeDirectory = Path.Combine(assembliesDirectory, "Chrome");
                var chromeExe = Path.Combine(chromeDirectory, "chrome.exe");

                SetChromeVersionToRegistry(chromeExe);

                var chromeDriverService = ChromeDriverService.CreateDefaultService(chromeDirectory);
                webDriver = new ChromeDriver(chromeDriverService, GetChromeCapabilities(chromeExe));
                webDriver.Manage().Window.Size = new Size(1280, 1024);
                return webDriver;
            }
        }

        private static ChromeOptions GetChromeCapabilities(string chromeExe)
        {
            var chromeOptions = new ChromeOptions
            {
                BinaryLocation = chromeExe
            };
            chromeOptions.AddArguments("--no-sandbox", "--start-maximized", "--disable-extensions");

            return chromeOptions;
        }

        private static string FindAssembliesDirectory()
        {
            var currentDirectory = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory);
            while(true)
            {
                if(currentDirectory == null)
                    throw new Exception("The folder Assemblies not found");
                var directories = currentDirectory.GetDirectories();
                foreach(var directoryInfo in directories)
                {
                    if(directoryInfo.Name == "browsers")
                        return directoryInfo.FullName;
                }
                currentDirectory = currentDirectory.Parent;
            }
        }

        private string GetAbsoluteUrl(string relativeUrl)
        {
            if(relativeUrl.StartsWith("http://") || relativeUrl.StartsWith("https://"))
                return relativeUrl;
            return $"http://{defaultDomain}:{defaultPort}/{relativeUrl}/";
        }

        private static void SetChromeVersionToRegistry(string chromePath)
        {
            var key = Registry.CurrentUser.CreateSubKey(RegistryKey);
            if (key == null)
            {
                throw new Exception($"Не удалось создать ключ {Registry.CurrentUser}\\{RegistryKey}");
            }
            key.SetValue("pv", FileVersionInfo.GetVersionInfo(chromePath).ProductVersion);
            key.Close();
        }

        private const string RegistryKey = @"Software\Google\Update\Clients\{8A69D345-D564-463c-AFF1-A69D9E530F96}";
        private IWebDriver webDriver;
        private readonly string defaultPort;
        private readonly string defaultDomain;
    }
}