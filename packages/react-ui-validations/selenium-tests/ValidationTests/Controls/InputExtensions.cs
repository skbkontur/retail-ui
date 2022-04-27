using OpenQA.Selenium;

using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.ValidationTests.Controls
{
    public static class InputExtensions
    {
        public static void SendKeys(this Input input, string value)
        {
            input.ExecuteAction(x =>
                {
                    var inputTag = x.FindElement(By.CssSelector("input"));
                    inputTag.SendKeys(value);
                }, $"SetValue({value})");
        }

        public static void SetValue(this Input input, string value)
        {
            input.ExecuteAction(x =>
                {
                    var inputTag = x.FindElement(By.CssSelector("input"));
                    inputTag.Click();
                    inputTag.SendKeys(Keys.Control + "a");
                    inputTag.SendKeys(Keys.Delete);
                    inputTag.SendKeys(value);
                    inputTag.SendKeys(Keys.Tab);
                }, $"SetValue({value})");
        }

        public static void InputValue(this Input input, string value)
        {
            input.ExecuteAction(x =>
                {
                    var inputTag = x.FindElement(By.CssSelector("input"));
                    inputTag.Click();
                    inputTag.SendKeys(Keys.Control + "a");
                    inputTag.SendKeys(Keys.Delete);
                    inputTag.SendKeys(value);
                }, $"InputValue({value})");
        }

        public static void TabOut(this Input input)
        {
            input.ExecuteAction(x =>
                {
                    var inputTag = x.FindElement(By.CssSelector("input"));
                    inputTag.Click();
                    inputTag.SendKeys(Keys.Tab);
                }, $"TabOut()");
        }
    }
}
