using System;
using System.Collections.Generic;
using System.Linq;

using SKBKontur.SeleniumTesting.Assertions.Bases;
using SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class ControlListAssertions<T> : ControlBaseAssertions<ControlListBase<T>, ControlListAssertions<T>> where T : ControlBase
    {
        public ControlListAssertions(IAssertable<ControlListBase<T>> subject)
            : base(subject)
        {
        }

        public ControlListAnyOfItemAssertions<T> AnyItem()
        {
            return new ControlListAnyOfItemAssertions<T>(Subject);
        }

        public ControlListAllItemAssertions<T> AllItems()
        {
            return new ControlListAllItemAssertions<T>(Subject);
        }

        public void HaveCount(int exepectedCount)
        {
            Count.EqualTo(exepectedCount);
        }

        public PropertyControlContext<ControlListBase<T>, int> Count { get { return HaveProperty(x => x.Count.Get(), "количество элементов"); } }

        public IAndContraint<ControlListAssertions<T>> AllItemsEquivalentTo(Func<T, string> propertySelector, string[] expected)
        {
            Subject.ExecuteAssert(
                x => ArraysEquivalent(x.GetItems().Select(propertySelector).ToArray(), expected),
                (x, m) =>
                    {
                        m = m.WithExpectation(new ArraysEquivalentExpectation(expected));
                        foreach(var item in x.GetItems().Select(propertySelector))
                        {
                            m.WithActual(item);
                        }
                        return m;
                    });
            return AndThis();
        }

        public IAndContraint<ControlListAssertions<T>> ItemsAs<TOut>(Func<T, TOut> propertySelector, Action<IEnumerable<TOut>> action)
        {
            Subject.ExecuteAssert((x) =>
                {
                    try
                    {
                        action(x.GetItems().Select(propertySelector));
                    }
                    catch(Exception exception)
                    {
                        return new ExceptionResult(exception);
                    }
                    return new ExceptionResult(null);
                }, (x, m, y) => m.WithExpectation(new CustomMessageExpectation("\n" + y.Exception.Message)));
            return AndThis();
        }

        private bool ArraysEquivalent(string[] array1, string[] array2)
        {
            return array1.Length == array2.Length && !array1.Except(array2).Any() && !array2.Except(array1).Any();
        }
    }
}