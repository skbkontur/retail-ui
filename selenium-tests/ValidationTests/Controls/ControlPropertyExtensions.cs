using System;
using System.Collections.Generic;
using System.Linq;

using Kontur.RetryableAssertions.Configuration;
using Kontur.RetryableAssertions.Extensions;
using Kontur.RetryableAssertions.ValueProviding;
using Kontur.Selone.Properties;

using NUnit.Framework;
using NUnit.Framework.Constraints;

using OpenQA.Selenium;

using SKBKontur.SeleniumTesting;

namespace SKBKontur.ValidationTests.Controls
{
    public static class ControlPropertyExtensions
    {
        private const int DefaultTimeout = 10000;

        public static void Wait(this Action action, int? timeout = null)
        {
            bool GetValue()
            {
                action();
                return true;
            }

            ValueProvider.Create(GetValue, "true").EqualTo(true, timeout);
        }

        public static AssertionConfiguration GetConfiguration(this int? timeout)
        {
            var exceptionMatcher = ExceptionMatcher.FromTypes(typeof(ElementNotFoundException), typeof(WebDriverException), typeof(InvalidOperationException), typeof(PropertyTransformationException));
            return new AssertionConfiguration {ExceptionMatcher = exceptionMatcher, Timeout = timeout ?? DefaultTimeout, Interval = 100};
        }

        public static IValueProvider<T, T> Wait<T>(this IProp<T> prop)
        {
            return ValueProvider.Create(prop.Get, prop.GetDescription);
        }

        public static IValueProvider<T[], T[]> Wait<T>(this IEnumerable<IProp<T>> props)
        {
            return ValueProvider.Create(() => props.Select(x => x.Get()).ToArray(), () => "todo");
        }

        public static IValueProvider<T[], T[]> Wait<T>(this IEnumerable<T> enumerable)
        {
            return ValueProvider.Create(enumerable.ToArray, () => "todo");
        }

        public static IValueProvider<(T1, T2)[], (T1, T2)[]> Wait<T1, T2>(this IEnumerable<Props<T1, T2>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IValueProvider<(T1, T2, T3)[], (T1, T2, T3)[]> Wait<T1, T2, T3>(this IEnumerable<Props<T1, T2, T3>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IValueProvider<(T1, T2, T3, T4)[], (T1, T2, T3, T4)[]> Wait<T1, T2, T3, T4>(this IEnumerable<Props<T1, T2, T3, T4>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IValueProvider<(T1, T2, T3, T4, T5)[], (T1, T2, T3, T4, T5)[]> Wait<T1, T2, T3, T4, T5>(this IEnumerable<Props<T1, T2, T3, T4, T5>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IValueProvider<(T1, T2, T3, T4, T5, T6)[], (T1, T2, T3, T4, T5, T6)[]> Wait<T1, T2, T3, T4, T5, T6>(this IEnumerable<Props<T1, T2, T3, T4, T5, T6>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IValueProvider<(T1, T2, T3, T4, T5, T6, T7)[], (T1, T2, T3, T4, T5, T6, T7)[]> Wait<T1, T2, T3, T4, T5, T6, T7>(this IEnumerable<Props<T1, T2, T3, T4, T5, T6, T7>> props)
        {
            return ValueProvider.Create(props.Select(x => x.Get()).ToArray, "");
        }

        public static IProp<T> OrNull<T>(this IProp<T> prop) where T : class
        {
            T Get()
            {
                try
                {
                    return prop.Get();
                }
                catch(Exception e) when(e is ElementNotVisibleException || e is NoSuchElementException)
                {
                    return null;
                }
            }

            return Prop.Create(Get, prop.GetDescription());
        }

        //todo прокинуть timeouts
        public static IAssertionResult<T, TSource> That<T, TSource>(this IValueProvider<T, TSource> valueProvider, IResolveConstraint constraint, int? timeout = null)
        {
            return valueProvider.That(constraint, null, timeout);
        }

        //todo прокинуть timeouts
        private static IAssertionResult<T, TSource> That<T, TSource>(this IValueProvider<T, TSource> valueProvider, IResolveConstraint constraint, string message, int? timeout = null)
        {
            var reusableConstraint = new ReusableConstraint(constraint);
            var assertionDelegate = Assertion.FromDelegate<T>(x => Assert.That(x, reusableConstraint, message));
            var assertionConfiguration = timeout.GetConfiguration();
            return valueProvider.Assert(assertionDelegate, assertionConfiguration);
        }

        //todo прокинуть timeouts
        public static IAssertionResult<T, TSource> That<T, TSource>(this IValueProvider<T, TSource> valueProvider, Action<T> assertion, int? timeout = null)
        {
            var assertionDelegate = Assertion.FromDelegate(assertion);
            var assertionConfiguration = timeout.GetConfiguration();
            return valueProvider.Assert(assertionDelegate, assertionConfiguration);
        }

        public static IAssertionResult<T, TSource> EqualTo<T, TSource>(this IValueProvider<T, TSource> provider, T expected, int? timeout = null)
        {
            return provider.That(Is.EqualTo(expected), timeout);
        }

        public static IAssertionResult<T[], TSource> EquivalentTo<T, TSource>(this IValueProvider<T[], TSource> provider, T[] expected, int? timeout = null)
        {
            return provider.That(Is.EquivalentTo(expected), timeout);
        }

        public static IAssertionResult<T, TSource> EqualTo<T, TSource>(this IValueProvider<T, TSource> provider, T expected, string message, int? timeout = null)
        {
            return provider.That(Is.EqualTo(expected), message);
        }

        public static IAssertionResult<string, TSource> Contain<TSource>(this IValueProvider<string, TSource> provider, string expected, string message = null, int? timeout = null)
        {
            return provider.That(Does.Contain(expected), message);
        }

        public static IAssertionResult<string, TSource> StartWith<TSource>(this IValueProvider<string, TSource> provider, string expected, string message = null, int? timeout = null)
        {
            return provider.That(Does.StartWith(expected), message);
        }

        public static IAssertionResult<bool, TSource> True<TSource>(this IValueProvider<bool, TSource> provider, string message = null, int? timeout = null)
        {
            return provider.EqualTo(true, message);
        }

        public static IAssertionResult<bool, TSource> False<TSource>(this IValueProvider<bool, TSource> provider, string message = null, int? timeout = null)
        {
            return provider.EqualTo(false, message);
        }
    }
}
