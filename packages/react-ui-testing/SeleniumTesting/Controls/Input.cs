using JetBrains.Annotations;

using Kontur.Selone.Properties;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Input : ControlBase
    {
        public Input(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void AppendText(string keys)
        {
            ExecuteAction(x =>
                {
                    var element = x.FindElement(By.CssSelector("input"));
                    element.SendKeys(keys);
                }, $"AppendText({keys})");
        }

        public void ClearAndInputText([NotNull] string text)
        {
            ExecuteAction(
                x =>
                    {
                        Clear();
                        if(text != "")
                        {
                            var inputElement = x.FindElement(By.CssSelector("input"));
                            inputElement.SendKeys(text);
                        }
                    },
                $"InputText({text})");
        }

        public void Clear()
        {
            ExecuteAction(
                x =>
                    {
                        var inputElement = x.FindElement(By.CssSelector("input"));
                        inputElement.SendKeys(Keys.Control + "a");
                        inputElement.SendKeys(Keys.Delete);
                    },
                "Clear");
        }

        public IProp<string> Value => ValueFromElement(x => ExecuteScript("return arguments[0].value", x.FindElement(By.CssSelector("input"))) as string);

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
    }
}
