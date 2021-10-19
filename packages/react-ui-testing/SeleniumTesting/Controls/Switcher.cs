using System.Collections.Generic;
using System.Linq;
using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Switcher : ControlBase
    {
        public Switcher(ISearchContainer container, ISelector selector) : base(container, selector)
        {
        }

        public IProp<bool> IsDisabled => ReactProperty<bool>("disabled");
        public IProp<string> Value => ReactProperty<string>("value");

        public IEnumerable<Button> Buttons => this.FindList().Of<Button>("Button").By("Group");

        public void SelectItemByName(string name)
        {
            Buttons.Single(x => x.Text.Get() == name).Click();
        }
    }
}
