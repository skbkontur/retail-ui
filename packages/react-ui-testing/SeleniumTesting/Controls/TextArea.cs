using JetBrains.Annotations;

using Kontur.Selone.Properties;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class TextArea : ControlBase
    {
        public TextArea(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void AppendText(string keys)
        {
            ExecuteAction(x =>
                {
                    var inputElement = GetInputElement(x);
                    inputElement.SendKeys(keys);
                }, $"AppendText({keys})");
        }

        public void ClearAndInputText([NotNull] string text)
        {
            ExecuteAction(
                x =>
                    {
                        var inputElement = GetInputElement(x);
                        Clear();
                        inputElement.SendKeys(text);
                    },
                $"InputText({text})");
        }

        private static IWebElement GetInputElement(IWebElement x)
        {
            var inputElement = x;
            if(inputElement.TagName != "textarea")
            {
                inputElement = x.FindElement(By.TagName("textarea"));
            }
            return inputElement;
        }

        public void Clear()
        {
            ExecuteAction(
                x =>
                    {
                        var inputElement = GetInputElement(x);
                        inputElement.SendKeys(Keys.End);
                        var length = inputElement.GetAttribute("value").Length;
                        while(length > 0)
                        {
                            inputElement.SendKeys(Keys.Backspace);
                            length--;
                        }
                    },
                "Clear");
        }

        public IProp<string> Value =>
            ValueFromElement(x =>
                {
                    var inputElement = GetInputElement(x);
                    return ExecuteScript("return arguments[0].value", inputElement) as string;
                });

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled", null);
    }
}
