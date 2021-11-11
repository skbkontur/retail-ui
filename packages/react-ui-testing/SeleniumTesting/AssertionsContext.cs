using System;

namespace SKBKontur.SeleniumTesting
{
    public static class AssertionsContext
    {
        public static TimeSpan GetDefaultWaitInterval()
        {
            return defaultInterval;
        }

        public static void SetDefaultWaitInterval(TimeSpan value)
        {
            defaultInterval = value;
        }

        private static TimeSpan defaultInterval = TimeSpan.FromSeconds(20);
    }
}