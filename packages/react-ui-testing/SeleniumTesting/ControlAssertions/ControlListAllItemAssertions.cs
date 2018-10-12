using System;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages;
using SKBKontur.SeleniumTesting.Controls;

namespace SKBKontur.SeleniumTesting
{
    public class ControlListAllItemAssertions<T> : IAssertable<T> where T : ControlBase
    {
        public ControlListAllItemAssertions(IAssertable<ControlListBase<T>> subject)
        {
            this.subject = subject;
        }

        public void ExecuteAssert<TCheckResult>(Func<T, TCheckResult> action, Func<T, IErrorMessageBuilder, TCheckResult, IErrorMessageBuilder> messageBuilder) where TCheckResult : ICheckResult
        {
            TCheckResult lastResult = default(TCheckResult);
            subject.ExecuteAssert(
                x =>
                    {
                        foreach(var item in x.GetItems())
                        {
                            lastResult = action(item);
                            if(!lastResult.Valid)
                            {
                                return lastResult;
                            }
                        }
                        return lastResult;
                    },
                (x, me, z) =>
                    {
                        me.WithListQuantifier($"для всех {x.GetRelativePathToItems()}");
                        if(!x.IsPresentObsolete)
                        {
                            messageBuilder(null, me, z);
                        }
                        else
                        {
                            foreach(var item in x.GetItems())
                            {
                                messageBuilder(item, me, z);
                            }
                        }
                        return me;
                    }
                );
        }

        public TimeSpan WaitInterval { get { return subject.WaitInterval; } set { subject.WaitInterval = value; } }

        private readonly IAssertable<ControlListBase<T>> subject;
    }
}