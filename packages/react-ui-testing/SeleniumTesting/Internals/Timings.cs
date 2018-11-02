namespace SKBKontur.SeleniumTesting.Internals
{
    public class Timings
    {
        public Timings(int? timeout = null, int? interval = null)
        {
            Timeout = timeout;
            Interval = interval;
        }

        public int? Timeout { get; }
        public int? Interval { get; }

        public static implicit operator Timings(int? timeout)
        {
            return new Timings(timeout);
        }

        public static implicit operator Timings(int timeout)
        {
            return new Timings(timeout);
        }

        public static void SetDefault(int? timeout = null, int? interval = null)
        {
            DefaultTimeout = timeout ?? DefaultTimeout;
            DefaultInterval = interval ?? DefaultInterval;
        }

        public static int DefaultTimeout { get; private set; } = 5000;
        public static int DefaultInterval { get; private set; } = 100;
    }
}