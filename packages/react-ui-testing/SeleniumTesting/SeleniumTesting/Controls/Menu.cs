using JetBrains.Annotations;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class Menu : ControlList<MenuItem>
    {
        public Menu([NotNull] ISearchContainer container, [NotNull] ISelector selector)
            : base(container, selector, new UniversalSelector("MenuItem"))
        {
        }
    }
}