using Kontur.Selone.Properties;
using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Toast : Portal
    {
        public Toast(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            // toastView = this.Find<Label>().By("ToastView");
            toastView = new Label(this, new UniversalSelector("ToastView"));
            notification = new Label(toastView, By.CssSelector("span:first-child"));
            Action = new Label(toastView, By.CssSelector("span:nth-child(2)"));
        }

        public Label Action { get; }

        public new IProp<bool> IsPresent => toastView.IsPresent;

        public override IProp<string> Text => notification.Text;

        public static Toast Static(ISearchContainer container)
        {
            return new Toast(container.GetRootContainer(), new UniversalSelector("##StaticToast"));
        }

        private readonly Label toastView;

        private readonly Label notification;
    }
}
