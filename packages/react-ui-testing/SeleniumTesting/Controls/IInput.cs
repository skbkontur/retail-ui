using JetBrains.Annotations;
using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public interface IInput: IControlBase
    {
        void AppendText(string keys);
        void ClearAndInputText([NotNull] string text);
        void Clear();
        IProp<string> Value { get; }
        IProp<bool> IsDisabled { get; }
    }
}