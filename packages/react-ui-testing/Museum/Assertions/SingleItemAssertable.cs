using System;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages;

namespace SKBKontur.SeleniumTesting.Assertions
{
    public class SingleItemAssertable<T> : IAssertable<T> where T : ControlBase
    {
        public SingleItemAssertable(T subject, TimeSpan? waitInterval = null)
        {
            this.subject = subject;
            WaitInterval = waitInterval ?? AssertionsContext.GetDefaultWaitInterval();
        }

        public void ExecuteAssert<TCheckResult>(Func<T, TCheckResult> action, Func<T, IErrorMessageBuilder, TCheckResult, IErrorMessageBuilder> messageBuilder) where TCheckResult : ICheckResult
        {
            TCheckResult lastResult = default(TCheckResult);
            Waiter.Wait(() =>
                {
                    lastResult = action(subject);
                    return lastResult.Valid;
                }, (timeout, exception) =>
                    {
                        IErrorMessageBuilder m = new ErrorMessageBuilder();
                        m.WithSubject(subject).WithTimeout(timeout);
                        if(exception != null)
                        {
                            var notFoundException = exception as ElementNotFoundException;
                            if(notFoundException != null)
                            {
                                m = messageBuilder(notFoundException.Control as T, m, lastResult);
                                m.WithFailedToFindControl(notFoundException);
                            }
                            else
                            {
                                throw new Exception($"Невозможно построить сообщений об ошибке. Произошла непредвиденная ошибка: {exception}", exception);
                            }
                        }
                        else
                        {
                            m = messageBuilder(subject, m, lastResult);
                        }

                        return m.Build();
                    }, WaitInterval);
        }

        public TimeSpan WaitInterval { get; set; }

        private readonly T subject;
    }
}
