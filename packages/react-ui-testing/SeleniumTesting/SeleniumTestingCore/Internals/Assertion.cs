using System.Text;

using Kontur.RetryableAssertions.TestFramework;
using Kontur.Selone.Properties;

namespace SKBKontur.SeleniumTesting.Internals
{
    internal static class Assertion
    {
        internal static void AssertEqualTo<T>(this IProp<T> actual, T expected)
        {
            AssertEqualTo(actual.Get(), expected, actual.GetDescription());
        }

        internal static void AssertEqualTo<T>(this T actual, T expected, string message = null)
        {
            if(Equals(actual, expected))
            {
                return;
            }
            var stringBuilder = new StringBuilder();
            if(!string.IsNullOrEmpty(message))
            {
                stringBuilder.AppendLine(message);
            }
            stringBuilder.AppendLine($"Expected: {expected}");
            stringBuilder.AppendLine($"But was: {actual}");

            throw AssertionExceptionHelper.CreateException(stringBuilder.ToString());
        }

        internal static void AssertGreaterThan(this int actual, int expected, string message = null)
        {
            if(actual > expected)
            {
                return;
            }
            var stringBuilder = new StringBuilder();
            if(!string.IsNullOrEmpty(message))
            {
                stringBuilder.AppendLine(message);
            }
            stringBuilder.AppendLine($"Expected: {expected}");
            stringBuilder.AppendLine($"But was: {actual}");

            throw AssertionExceptionHelper.CreateException(stringBuilder.ToString());
        }

        internal static void AssertStartsWith(this IProp<string> actual, string expected)
        {
            AssertStartsWith(actual.Get(), expected, actual.GetDescription());
        }

        internal static void AssertStartsWith(this string actual, string expected, string message = null)
        {
            if(actual != null && expected != null && actual.StartsWith(expected))
            {
                return;
            }
            var stringBuilder = new StringBuilder();
            if(!string.IsNullOrEmpty(message))
            {
                stringBuilder.AppendLine(message);
            }
            stringBuilder.AppendLine($"Expected starts with: {expected}");
            stringBuilder.AppendLine($"But was: {actual}");

            throw AssertionExceptionHelper.CreateException(stringBuilder.ToString());
        }
    }
}