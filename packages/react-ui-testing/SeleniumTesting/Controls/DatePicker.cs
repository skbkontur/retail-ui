using System;
using System.Text;
using Kontur.Selone.Extensions;
using Kontur.Selone.Properties;
using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class DatePicker : ControlBase
    {
        public DatePicker(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void Clear()
        {
            ExecuteAction(x =>
            {
                var strategy = GetStrategy(x);
                strategy.Focus();
                strategy.Clear();
                strategy.Blur();
            }, "Clear");
        }

        public void ClearAndInputText(string text)
        {
            ExecuteAction(x =>
            {
                var strategy = GetStrategy(x);
                strategy.Focus();
                strategy.Clear();
                strategy.Input(text);
                strategy.Blur();
            }, $"ClearAndInputText({text})");
        }

        public void ClearAndInputDate(DateTime date)
        {
            ExecuteAction(x =>
            {
                var strategy = GetStrategy(x);
                strategy.Focus();
                strategy.Clear();
                strategy.Input(date.ToUniversalTime().ToString("dd.MM.yyyy"));
                strategy.Blur();
            }, $"ClearAndInputDate({date})");
        }

        private static IStrategy GetStrategy(IWebElement container)
        {
            var span = container.FindElement(By.CssSelector("label>span"));
            return new SpanInputStrategy(span);
        }

        public IProp<string> Value => ValueFromElement(x => GetStrategy(x).Value);
        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");

        private interface IStrategy
        {
            string Value { get; }
            void Clear();
            void Input(string value);
            void Focus();
            void Blur();
        }

        private class OldInputStrategy : IStrategy
        {
            private readonly IWebElement input;

            public OldInputStrategy(IWebElement input)
            {
                this.input = input;
            }

            public string Value => input.WebDriver().JavaScriptExecutor().ExecuteWithSingleResult<string>("return arguments[0].value", input);

            public void Clear()
            {
                input.SendKeys(Keys.Control + "a");
                input.SendKeys(Keys.Backspace);
            }

            public void Input(string value)
            {
                input.SendKeys(value);
            }

            public void Focus()
            {
                input.Click();
            }

            public void Blur()
            {
                input.SendKeys(Keys.Tab);
            }
        }

        private class SpanInputStrategy : IStrategy
        {
            private readonly IWebElement span;

            public SpanInputStrategy(IWebElement span)
            {
                this.span = span;
            }

            public string Value => span.Text().Get();

            public void Clear()
            {
                span.SendKeys(Keys.Control + "a");
                span.SendKeys(Keys.Backspace);
            }

            public void Input(string value)
            {
                EmulateSendKeys(span, value.Replace(".", string.Empty));
            }

            public void Focus()
            {
                span.Click();
            }

            public void Blur()
            {
                span.SendKeys(Keys.Tab);
            }

            private static void EmulateSendKeys(IWebElement webElement, string s)
            {
                var stringBuilder = new StringBuilder();
                stringBuilder.AppendLine("var createKeydownEvent = function(char) {");
                stringBuilder.AppendLine("    return new KeyboardEvent('keydown', {");
                stringBuilder.AppendLine("        key: char,");
                stringBuilder.AppendLine("        bubbles: true,");
                stringBuilder.AppendLine("    });");
                stringBuilder.AppendLine("};");
                stringBuilder.AppendLine($"var input = \'{s}\'");
                stringBuilder.AppendLine("for (var i = 0; i < input.length; ++i) {");
                stringBuilder.AppendLine("    var char = input[i]");
                stringBuilder.AppendLine("    var event = createKeydownEvent(char);");
                stringBuilder.AppendLine("    x.dispatchEvent(event);");
                stringBuilder.AppendLine("}");
                var js = stringBuilder.ToString();
                webElement.ExecuteJs(js);
            }
        }
    }
}
