using System;
using System.Collections.Generic;
using System.Linq;

using Kontur.RetryableAssertions.Configuration;
using Kontur.RetryableAssertions.Extensions;
using Kontur.RetryableAssertions.ValueProviding;
using Kontur.Selone.Properties;

using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Internals
{
    internal static class AssertionExtensions
    {
        internal static IValueProvider<T, T> Wait<T>(this IProp<T> property)
        {
            return ValueProvider.Create(property.Get, property.GetDescription);
        }

        internal static IValueProvider<T[], T[]> Wait<T>(this IEnumerable<IProp<T>> properties)
        {
            return ValueProvider.Create(() => properties.Select(x => x.Get()).ToArray(), string.Join("\n", properties.Select(x => x.GetDescription())));
        }

        internal static IValueProvider<T, T> Wait<T>(this T control) where T : ControlBase
        {
            return ValueProvider.Create(() => control, control.GetNameWithSelector);
        }

        internal static IValueProvider<T[], T[]> Wait<T>(this IEnumerable<T> controls)
        {
            return ValueProvider.Create(controls.ToArray);
        }

        internal static IAssertionResult<T, TSource> That<T, TSource>(this IValueProvider<T, TSource> provider, Action<T> assertion, Timings timings)
        {
            return provider.Assert(assertion, timings.GetConfiguration());
        }

        internal static AssertionConfiguration GetConfiguration(this Timings timings)
        {
            return new AssertionConfiguration
                {
                    Timeout = timings?.Timeout ?? 5000,
                    Interval = timings?.Timeout ?? 100,
                    ExceptionMatcher = ExceptionMatcher
                };
        }

        private static IExceptionMatcher ExceptionMatcher { get; } = Kontur.RetryableAssertions.Configuration.ExceptionMatcher.FromTypes(
            typeof(ElementNotFoundException),
            typeof(WebDriverException),
            typeof(InvalidOperationException));
    }
}