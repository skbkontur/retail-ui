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
    }
}