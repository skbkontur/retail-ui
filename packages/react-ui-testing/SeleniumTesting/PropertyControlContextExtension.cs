using System;
using System.Linq;
using System.Text.RegularExpressions;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations;
using SKBKontur.SeleniumTesting.Internals.Commons;

namespace SKBKontur.SeleniumTesting
{
    public static class PropertyControlContextExtension
    {
        public static IAndContraint<IPropertyControlContext<string>> BeOneOf(this IPropertyControlContext<string> context, params string[] values)
        {
            return context.Satisfy(
                values.Contains,
                "ожидалось одним из",
                "ожидалось не одним из",
                Helpers.FormatStringValues(values, 2));
        }

        public static IAndContraint<IPropertyControlContext<string>> Match(this IPropertyControlContext<string> context, string matchString)
        {
            var regex = MatchStringToRegex(matchString);
            return context.Satisfy(
                x => regex.IsMatch(x),
                "ожидалось подходящим под шаблон",
                "ожидалось не подходящим под шаблон",
                Helpers.FormatStringValue(matchString));
        }

        public static IAndContraint<IPropertyControlContext<string>> StartWith(this IPropertyControlContext<string> context, string startString)
        {
            return context.Satisfy(
                x => x.StartsWith(startString),
                "ожидалось начинающимся с",
                "ожидалось не начинающимся с",
                Helpers.FormatStringValue(startString));
        }

        private static Regex MatchStringToRegex(string matchString)
        {
            return new Regex(
                matchString
                    .Replace("*", "__ASTERISK__")
                    .Replace("?", "__QUESTION__")
                    .With(Regex.Escape)
                    .Replace("__ASTERISK__", ".+?")
                    .Replace("__QUESTION__", "."));
        }

        public static IAndContraint<IPropertyControlContext<string>> HaveLength(this IPropertyControlContext<string> context, int expectedLength)
        {
            return context.Satisfy(
                x => x.Length == expectedLength,
                $"ожидалось, что будет иметь длину {expectedLength}",
                $"ожидалось, что не будет иметь длину {expectedLength}");
        }

        public static IAndContraint<IPropertyControlContext<string>> BeEmpty(this IPropertyControlContext<string> context)
        {
            return context.Satisfy(
                x => x == "",
                "ожидалось пустым",
                "ожидалось непустым");
        }

        public static IAndContraint<IPropertyControlContext<string>> EqualTo(this IPropertyControlContext<string> context, string value)
        {
            return context.ExecuteAssert(x => x == value, m => m.WithExpectation(new ExactValueExpectation(value.ToString())));
        }

        public static IAndContraint<IPropertyControlContext<int>> GreaterThan(this IPropertyControlContext<int> context, int value)
        {
            return context.ExecuteAssert(x => x > value, m => m.WithExpectation(new CustomMessageExpectation($"ожидалось больше чем {value}")));
        }

        public static IAndContraint<IPropertyControlContext<string>> Satisfy(
            this IPropertyControlContext<string> context,
            Func<string, bool> condition,
            string expectsText, string negationExpectText, string expectedValue = null)
        {
            return context.ExecuteAssert(
                condition,
                m => m.WithExpectation(
                    new CustomStringExpectation(expectsText, negationExpectText, expectedValue)
                         )
                );
        }

        public static IAndContraint<IPropertyControlContext<string>> Contain(this IPropertyControlContext<string> context, string value)
        {
            return context.ExecuteAssert(x => x.Contains(value), m => m.WithExpectation(new ContainsValueExpectation(value.ToString())));
        }

        public static IAndContraint<IPropertyControlContext<int>> EqualTo(this IPropertyControlContext<int> context, int value)
        {
            return context.ExecuteAssert(x => x == value, m => m.WithExpectation(new ExactValueExpectation(value.ToString())));
        }

        public static IAndContraint<IPropertyControlContext<bool>> BeTrue(this IPropertyControlContext<bool> context)
        {
            return context.ExecuteAssert(x => x, m => m.WithExpectation(new BooleanValueExpectation(true)));
        }

        public static IAndContraint<IPropertyControlContext<bool>> BeFalse(this IPropertyControlContext<bool> context)
        {
            return context.ExecuteAssert(
                x => !x,
                m => m.WithExpectation(new BooleanValueExpectation(false)));
        }

        public static IAndContraint<IPropertyControlContext<string>> MatchToRegex(this IPropertyControlContext<string> context, Regex regex)
        {
            return context.ExecuteAssert(regex.IsMatch, m => m.WithExpectation(new MatchValueExpectation(regex.ToString())));
        }
    }
}