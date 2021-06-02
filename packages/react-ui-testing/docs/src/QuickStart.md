### Начальные требования

-   Microsoft Visual Studio 2015+
-   node.js + npm
-   Chrome

### Устновка и запуск chromedriver

-   [Скачать](https://chromedriver.storage.googleapis.com/index.html?path=2.34/) и запусть chromedriver
-   В Microsoft Visual Studio 2015+ cоздать пустой ClassLibrary проект
-   Добавить в зависимости Selnium.WebDriver и NUnit
-   Запустить простейший тест:

```markup static
    using System;
    using NUnit.Framework;
    using OpenQA.Selenium.Remote;
    using SKBKontur.SeleniumTesting;
    using SKBKontur.SeleniumTesting.Controls;

    namespace ReactUiTestingDemo
    {
        public class DemoPageTest
        {
            [SetUp]
            public void SetUp()
            {
                webdriver = new RemoteWebDriver(new Uri(@"http://localhost:9515"), new DesiredCapabilities());
            }

            [TearDown]
            public void TearDown()
            {
                webdriver.Close();
            }

            [Test]
            public void OpenPageAndCheckInput()
            {
                webdriver.Navigate().GoToUrl("http://tech.skbkontur.ru/react-ui-testingccc/demo-page/");
                var demoPage = new DemoPage(webdriver);

                Assert.That(demoPage.ValueInput.IsPresent.Get, Is.True.After(1000, 100));
                demoPage.ValueInput.ClearAndInputText("TestText");
                Assert.That(demoPage.ValueLabel.Text.Get, Is.EqualTo("TestText").After(1000, 100));
            }

            private RemoteWebDriver webdriver;
        }

        public class DemoPage : PageBase
        {
            public DemoPage(RemoteWebDriver webDriver) : base(webDriver)
            {
                ValueInput = this.Find<Input>().By("##ValueInput");
                ValueLabel = this.Find<Label>().By("##ValueLabel");
            }

            public Input ValueInput { get; set; }

            public Label ValueLabel { get; set; }
        }
    }
```
