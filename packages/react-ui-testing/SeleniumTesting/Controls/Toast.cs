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
        }

        private Label ToastView => this.Find<Label>().By("ToastView");

        public Label Action => new Label(ToastView, new BySelector(By.CssSelector("span:nth-child(2)")));

        public new IProp<bool> IsPresent => ToastView.IsPresent;

        public override IProp<string> Text => Property(() => ToastView.Search(new BySelector(By.CssSelector("span:first-child"))).Text, "text");

        public static Toast Static(ISearchContainer container)
        {
            return new Toast(container.GetRootContainer(), new UniversalSelector("##StaticToast"));
        }
    }
}
