using System;
using System.Collections.Generic;
using System.Linq;

using Kontur.RetryableAssertions.Configuration;
using Kontur.RetryableAssertions.ValueProviding;
using Kontur.Selone.Properties;
using NUnit.Framework;
using NUnit.Framework.Constraints;
using NUnit.Framework.Internal;
using OpenQA.Selenium;

namespace SKBKontur.SeleniumTesting.Tests.Helpers
{
    public static class AssertionExtensions
    {
        public static IValueProvider<T, T> Wait<T>(this IProp<T> property)
        {
            return ValueProvider.Create(property.Get, property.GetDescription);
        }

        public static IValueProvider<T[], T[]> Wait<T>(this IEnumerable<IProp<T>> properties)
        {
            return ValueProvider.Create(() => properties.Select(x => x.Get()).ToArray(), string.Join("\n", properties.Select(x => x.GetDescription())));
        }

        public static IAssertionResult<T, TSource> That<T, TSource>(this IValueProvider<T, TSource> provider, IResolveConstraint constraint)
        {
            var reusableConstraint = new ReusableConstraint(constraint);
            var assertion = Assertion.FromDelegate<T>(x =>
                {
                    using (new TestExecutionContext.IsolatedContext())
                    {
                        NUnit.Framework.Assert.That(x, reusableConstraint);
                    }
                });
            var configuration = new AssertionConfiguration<T>
                {
                    Timeout = 2000,
                    Interval = 100,
                    Assertion = assertion,
                    ExceptionMatcher = ExceptionMatcher.FromTypes(typeof(WebDriverException), typeof(InvalidOperationException), typeof(ElementNotFoundException))
                };
            return Kontur.RetryableAssertions.Wait.Assertion(provider, configuration);
        }

        public static void Assert<T>(this IProp<T> property, IResolveConstraint constraint)
        {
            NUnit.Framework.Assert.That(property.Get(), new ReusableConstraint(constraint), property.GetDescription());
        }

        public static void Assert<T>(this T value, IResolveConstraint constraint, string message = null)
        {
            NUnit.Framework.Assert.That(value, new ReusableConstraint(constraint), message);
        }

        public static IAssertionResult<T, TSource> EqualTo<T, TSource>(this IValueProvider<T, TSource> provider, T expected)
        {
            return provider.That(Is.EqualTo(expected));
        }

        public static IAssertionResult<bool, TSource> True<TSource>(this IValueProvider<bool, TSource> provider)
        {
            return provider.EqualTo(true);
        }

        public static IAssertionResult<bool, TSource> False<TSource>(this IValueProvider<bool, TSource> provider)
        {
            return provider.EqualTo(false);
        }
    }
}