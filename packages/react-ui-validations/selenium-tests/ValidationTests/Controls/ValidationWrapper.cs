using SKBKontur.SeleniumTesting;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.ValidationTests.Controls
{
    public class ValidationWrapper : ControlBase
    {
        public ValidationWrapper(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            Label = this.Find<Label>().By("[data-validation-message='text']");
        }

        public Label Label { get; }
    }
}
