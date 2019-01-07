using System;
using System.Diagnostics;
using System.IO;

using Kontur.Selone.Extensions;
using Kontur.Selone.WebDrivers;

using Microsoft.Win32;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SKBKontur.ValidationTests.Infrastructure
{
    public class ChromeDriverFactory : IWebDriverFactory
    {
        private const bool UseSpecificChrome = true;
        private const string RegistryKey = @"Software\Google\Update\Clients\{8A69D345-D564-463c-AFF1-A69D9E530F96}";

        public IWebDriver Create()
        {
            SetChromeVersionToRegistry(chromeExe);

            for(var i = 0; i < 3; i++)
            {
                try
                {
                    var chromeDriverService = CreateChromeDriverService();
                    var options = CreateChromeOptions(chromeExe);
                    return CreateChromeDriver(chromeDriverService, options);
                }
                catch(InvalidOperationException e) when(e.Message.Contains("session not created exception"))
                {
                }
            }

            return null;
        }

        private static void SetChromeVersionToRegistry(string chromeExe)
        {
            if(chromeExe == null)
            {
                return;
            }

            var key = Registry.CurrentUser.CreateSubKey(RegistryKey);
            if(key == null)
            {
                throw new Exception($"Не удалось создать ключ {Registry.CurrentUser}\\{RegistryKey}");
            }

            key.SetValue("pv", FileVersionInfo.GetVersionInfo(chromeExe).ProductVersion);
            key.Close();
        }

        private static ChromeOptions CreateChromeOptions(string chromeExe)
        {
            var options = new ChromeOptions();
            if(chromeExe != null)
            {
                options.BinaryLocation = chromeExe;
            }

            options.AddArguments("--no-sandbox", "--start-maximized", "--disable-extensions");
            return options;
        }

        private ChromeDriverService CreateChromeDriverService()
        {
            return ChromeDriverService.CreateDefaultService(path);
        }

        private IWebDriver CreateChromeDriver(ChromeDriverService chromeDriverService, ChromeOptions options)
        {
            var chromeDriver = new ChromeDriver(chromeDriverService, options, TimeSpan.FromSeconds(180));
            chromeDriver.Manage().Window.SetSize(900, 700);
            return chromeDriver;
        }

        private static readonly string path = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "..", "selenium-tests", "Assemblies", "Chrome"));
        private static readonly string chromeExe = UseSpecificChrome ? Path.Combine(path, "chrome.exe") : null;
    }
}
