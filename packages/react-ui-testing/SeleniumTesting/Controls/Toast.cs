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
            toastView = this.Find<Label>().By("ToastView");
            notification = new Label(toastView, new BySelector(By.CssSelector("span:first-child")));
            Action = new Label(toastView, new BySelector(By.CssSelector("span:nth-child(2)")));
        }

        public Label Action { get; }

        public new IProp<bool> IsPresent => toastView.IsPresent;

        public override IProp<string> Text => notification.Text;

        private readonly Label toastView;

        private readonly Label notification;
    }
}
