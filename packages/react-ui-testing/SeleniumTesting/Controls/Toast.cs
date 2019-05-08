using Kontur.Selone.Properties;
using OpenQA.Selenium;
using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Toast : Portal
    {
        public Toast(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            ToastView = this.Find<Label>().By("ToastView");
            Notification = new Label(ToastView, new BySelector(By.CssSelector("span:first-child")));
            Action = new Label(ToastView, new BySelector(By.CssSelector("span:nth-child(2)")));
        }

        private Label ToastView { get; }

        private Label Notification { get; }

        public Label Action { get; }

        public new IProp<bool> IsPresent => ToastView.IsPresent;

        public override IProp<string> Text => Notification.Text;

        public static Toast Static(ISearchContainer container)
        {
            return new Toast(container.GetRootContainer(), new UniversalSelector("##StaticToast"));
        }
    }
}
