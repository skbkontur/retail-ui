using System;
using System.Runtime.Serialization;

namespace SKBKontur.SeleniumTesting.TestFrameworks
{
    internal class FallbackTestFramework : ITestFramework
    {
        public bool IsAvailable { get { return true; } }

        public void Throw(string message)
        {
            throw new AssertionFailedException(message);
        }
    }

    [Serializable]
    public class AssertionFailedException : Exception
    {
        public AssertionFailedException(string message)
            : base(message)
        {
        }

        protected AssertionFailedException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}