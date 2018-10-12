namespace SKBKontur.SeleniumTesting.Controls
{
    public class PopupBase : Portal
    {
        public PopupBase(ISearchContainer container, ISelector selector)
            : base(container, selector)
        {
        }
    }
}