using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Label : ControlBase
    {
        public Label(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");

        public IProp<string> Text => TextProperty();
    }
}