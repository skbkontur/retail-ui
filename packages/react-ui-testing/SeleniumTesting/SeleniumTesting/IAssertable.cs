using System;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages;

namespace SKBKontur.SeleniumTesting
{
    public interface ICheckResult
    {
        bool Valid { get; }
    }

    public interface IAssertable<out T> where T : ControlBase
    {
        void ExecuteAssert<TCheckResult>(Func<T, TCheckResult> action, Func<T, IErrorMessageBuilder, TCheckResult, IErrorMessageBuilder> messageBuilder) where TCheckResult : ICheckResult;

        TimeSpan WaitInterval { get; set; }
    }

    public static class AssertableExtensions
    {
        public static void ExecuteAssert<T>(this IAssertable<T> assertable, Func<T, bool> action, Func<T, IErrorMessageBuilder, IErrorMessageBuilder> messageBuilder) where T : ControlBase
        {
            assertable.ExecuteAssert(
                (x) => new BoolCheckResult(action(x)),
                (x, y, z) => messageBuilder(x, y)
                );
        }

        class BoolCheckResult : ICheckResult
        {
            public BoolCheckResult(bool valid)
            {
                Valid = valid;
            }

            public bool Valid { get; private set; }
        }
    }
}