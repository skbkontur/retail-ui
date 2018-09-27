using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Radio : ControlBase
    {
        public Radio(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }

        public void Select()
        {
            ExecuteAction(element => element.Click(), "Select");
        }

        public IProp<bool> Selected => ValueFromElement(element => element.GetAttribute("checked") == "true");
    }
}