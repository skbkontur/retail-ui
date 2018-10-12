using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

using JetBrains.Annotations;

using Kontur.RetryableAssertions.Extensions;
using Kontur.Selone.Properties;

using SKBKontur.SeleniumTesting.Internals;
using SKBKontur.SeleniumTesting.Internals.Selectors;

namespace SKBKontur.SeleniumTesting.Controls
{
    public class ControlListBase<TItem> : CompoundControl, IEnumerable<TItem> where TItem : ControlBase
    {
        public ControlListBase([NotNull] ISearchContainer container, [NotNull] ISelector selector, [NotNull] ISelector itemSelector, Func<ISearchContainer, ISelector, TItem> createItem)
            : base(container, selector)
        {
            this.itemSelector = itemSelector;
            this.createItem = createItem;
        }

        public IProp<int> Count => Property(() => GetValueFromElement(x => x.FindElements(itemSelector.SeleniumBy)).Count, "items count");

        [NotNull]
        public TItem this[int index] => GetItemAt(index);

        [NotNull]
        [Obsolete]
        public List<TItem> GetItems()
        {
            return this.ToList();
        }

        [NotNull]
        public string GetRelativePathToItems()
        {
            return itemSelector.ToString();
        }

        [CanBeNull]
        public TItem GetItemByUniqueTid(UniversalSelector tid)
        {
            return GetItemInstance(tid);
        }

        [NotNull]
        public TItem GetItemAt(int index, Timings timings = null)
        {
            return this.AsEnumerable().Wait().ElementAt(index, timings.GetConfiguration());
        }

        [NotNull]
        public TItem GetItemThat(Action<TItem> assertion, Timings timings = null)
        {
            return this.AsEnumerable().Wait().Single(assertion, timings.GetConfiguration());
        }

        protected virtual TItem GetItemInstance(ISelector selector)
        {
            return createItem(this, selector);
        }

        public virtual IEnumerator<TItem> GetEnumerator()
        {
            return Enumerable.Range(0, Count.Get()).Select(i => GetItemInstance(CreateItemSelector(i))).GetEnumerator();
        }

        private ISelector CreateItemSelector(int index)
        {
            return new SelectorWithIndexWrapper(itemSelector, index);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        private readonly ISelector itemSelector;
        private readonly Func<ISearchContainer, ISelector, TItem> createItem;
    }
}