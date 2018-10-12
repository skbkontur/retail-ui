using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class MenuItem : ControlBase
    {
        public MenuItem(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public IProp<string> Text => TextProperty();
    }
}