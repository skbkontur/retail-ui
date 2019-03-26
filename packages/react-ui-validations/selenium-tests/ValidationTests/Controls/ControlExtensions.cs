using Kontur.Selone.Properties;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.ValidationTests.Controls
{
    public static class ControlExtensions
    {
        public static IProp<bool> WithError(this ControlBase control)
        {
            return Prop.Create(control.HasError, "error");
        }

        public static void WaitError(this ControlBase control)
        {
            control.WithError().Wait().True();
        }

        public static void WaitNoError(this ControlBase control)
        {
            control.WithError().Wait().False();
        }

        public static void WaitPresent(this ControlBase control)
        {
            control.IsPresent.Wait().True();
        }

        public static void WaitAbsent(this ControlBase control)
        {
            control.IsPresent.Wait().False();
        }

        public static void WaitText(this Label control, string text)
        {
            control.Text.Wait().EqualTo(text);
        }
    }
}
