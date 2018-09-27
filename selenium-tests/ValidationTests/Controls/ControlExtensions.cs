using Kontur.Selone.Properties;

using SKBKontur.SeleniumTesting;

namespace SKBKontur.ValidationTests.Controls
{
    public static class ControlExtensions
    {
        public static IProp<bool> WithError(this ControlBase control)
        {
            return Prop.Create(() => control.HasError(), "error");
        }
    }
}
