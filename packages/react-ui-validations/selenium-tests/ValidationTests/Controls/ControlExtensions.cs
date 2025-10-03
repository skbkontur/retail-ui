using System.Threading;

using Kontur.Selone.Properties;

using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.ValidationTests.Controls
{
    public static class ControlExtensions
    {
        public static IProp<bool> WithError(this ControlBase control)
        {
            return control.HasError.Check(v =>
                {
                    var v1 = v;
                });
        }

        public static IProp<bool> WithWarning(this ControlBase control)
        {
            return control.HasWarning.Check(v =>
                {
                    var v1 = v;
                });
        }

        public static IProp<bool> WithFocus(this ControlBase control)
        {
            return Prop.Create(control.HasFocus, "focused");
        }

        public static void WaitError(this ControlBase control)
        {
            Thread.Sleep(500); // Wait() below doesn't work for some reason 
            control.WithError().Wait().True();
        }

        public static void WaitWarning(this ControlBase control)
        {
            control.WithWarning().Wait().True();
        }

        public static bool HasFocus(this ControlBase control)
        {
            return control.GetAttributeValue("data-prop-focused") == "true";
        }

        public static void WaitFocus(this ControlBase control)
        {
            control.WithFocus().Wait().True();
        }

        public static void WaitNotFocus(this ControlBase control)
        {
            control.WithFocus().Wait().False();
        }

        public static void WaitNoError(this ControlBase control)
        {
            Thread.Sleep(500); // Wait() below doesn't work for some reason 
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
