using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Toggle : ControlBase
    {
        public Toggle(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public IProp<bool> IsChecked => ReactProperty<bool>("checked");

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
    }
}
