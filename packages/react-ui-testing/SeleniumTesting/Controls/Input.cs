using System.Threading;
using JetBrains.Annotations;
using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Internals;

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

        /// <summary>
        /// Вводит текст при помощи SendKeys.
        /// Это почти мгновенный ввод, который не всгеда корректно обрабатывается фронтом.
        /// Поэтому есть альтернативные методы - ClearAndEnsureInputText и ClearAndInputTextWithDelays
        /// </summary>
        /// <param name="text">Вводимая строка</param>
        public void ClearAndInputText([NotNull] string text)
        {
            Clear();
            if (text == "")
            {
                return;
            }
            ExecuteAction(
                x =>
                    {
                        var inputElement = x.FindElement(By.CssSelector("input"));
                        inputElement.SendKeys(text);
                    },
                $"InputText({text})");
        }

        /// <summary>
        /// Явно дожидается успешного ввода каждого символа.
        /// Полезно, если фронт не успевает обрабатывать ввод через ClearAndInputText
        /// </summary>
        /// <param name="text">Вводимая строка</param>
        public void ClearAndEnsureInputText([NotNull] string text)
        {
            Clear();
            if (text == "")
            {
                return;
            }
            ExecuteAction(
                x =>
                {
                    var inputElement = x.FindElement(By.CssSelector("input"));
                    var buffer = "";
                    foreach (var c in text)
                    {
                        inputElement.SendKeys(c.ToString());
                        buffer += c;
                        var currentBuffer = buffer;
                        Value.Wait().That(y => y.AssertEqualTo(currentBuffer), null);
                    }
                },
                $"ClearAndEnsureInputText({text})");
        }

        /// <summary>
        /// Ввод с фиксированной задержкой после каждого символа.
        /// Полезно, если фронт не успевает обрабатывать ввод через ClearAndInputText
        /// </summary>
        /// <param name="text">Вводимая строка</param>
        /// <param name="delayMilliseconds">Задержка после ввода символа, по дефолту 100 мс</param>
        public void ClearAndInputTextWithDelays([NotNull] string text, int delayMilliseconds = 100)
        {
            Clear();
            if (text == "")
            {
                return;
            }
            ExecuteAction(
                x =>
                {
                    var inputElement = x.FindElement(By.CssSelector("input"));
                    foreach (var c in text)
                    {
                        inputElement.SendKeys(c.ToString());
                        Thread.Sleep(delayMilliseconds);
                    }
                },
                $"ClearAndInputTextWithDelays({text}, {delayMilliseconds})");
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
