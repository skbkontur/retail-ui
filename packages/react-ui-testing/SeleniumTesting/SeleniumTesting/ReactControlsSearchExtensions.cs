using System;
using System.Linq;

using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public static class ReactControlsSearchExtensions
    {
        public static Tuple<ISearchContainer, TControl> Find<TControl>(this ISearchContainer container)
        {
            return Tuple.Create(container, default(TControl));
        }

        public static Tuple<ISearchContainer> FindList(this ISearchContainer container)
        {
            return Tuple.Create(container);
        }

        public static Tuple<ISearchContainer, TControl, UniversalSelector> Of<TControl>(this Tuple<ISearchContainer> controlListContext, UniversalSelector selector)
        {
            return Tuple.Create(controlListContext.Item1, default(TControl), selector);
        }

        public static ControlList<TControl> By<TControl>(this Tuple<ISearchContainer, TControl, UniversalSelector> controlListContext, UniversalSelector selector) where TControl : ControlBase
        {
            return Activator.CreateInstance(typeof(ControlList<TControl>), controlListContext.Item1, selector, controlListContext.Item3) as ControlList<TControl>;
        }

        public static TControl ByTid<TControl>(this Tuple<ISearchContainer, TControl> controlContext, params string[] tids) where TControl : class
        {
            return Activator.CreateInstance(typeof(TControl), controlContext.Item1, new UniversalSelector(string.Join(" ", tids.Select(x => "##" + x).ToArray()))) as TControl;
        }

        public static TControl By<TControl>(this Tuple<ISearchContainer, TControl> controlContext, UniversalSelector selector) where TControl : class
        {
            return Activator.CreateInstance(typeof(TControl), controlContext.Item1, selector) as TControl;
        }
    }
}