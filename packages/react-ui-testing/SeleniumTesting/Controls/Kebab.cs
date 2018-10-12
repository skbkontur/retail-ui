using System;

using Kontur.Selone.Properties;

using SKBKontur.SeleniumTesting.Internals;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Kebab : ControlBase
    {
        public Kebab(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
            popup = new KebabPopup(this, new UniversalSelector("Popup"));
        }

        public void SelectItemByIndex(int index, Timings timings = null)
        {
            Click();
            Menu.GetItemAt(index, timings).Click();
        }

        public void SelectItem(Action<MenuItem> assertion, Timings timings = null)
        {
            Click();
            Menu.GetItemThat(assertion).Click();
        }

        public PopupBase Popup => popup;
        public Menu Menu => popup.Menu;

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
        private readonly KebabPopup popup;

        public class KebabPopup : PopupBase
        {
            public KebabPopup(ISearchContainer container, ISelector selector)
                : base(container, selector)
            {
                Menu = new Menu(this, new UniversalSelector("[data-comp-name~='Menu'], [data-comp-name~='InternalMenu']"));
            }

            public Menu Menu { get; }
        }
    }
}