using System;

namespace SKBKontur.SeleniumTesting.Tests.Helpers
{
    internal static class To
    {
        public static string Text(params string[] lines)
        {
            return string.Join(Environment.NewLine, lines) + Environment.NewLine;
        }
    }
}