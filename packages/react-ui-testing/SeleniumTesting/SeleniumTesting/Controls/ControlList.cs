using System;

using JetBrains.Annotations;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class ControlList<TItem> : ControlListBase<TItem> where TItem : ControlBase
    {
        public ControlList([NotNull] ISearchContainer container, [NotNull] ISelector selector, [NotNull] ISelector itemSelector)
            : base(container, selector, itemSelector, CreateItemInstance)
        {
        }

        private static TItem CreateItemInstance(ISearchContainer container, ISelector selector)
        {
            return Activator.CreateInstance(typeof(TItem), container, selector) as TItem;
        }
    }
}