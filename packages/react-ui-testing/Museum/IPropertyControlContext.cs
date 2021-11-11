using System;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages;

namespace SKBKontur.SeleniumTesting
{
    public interface IPropertyControlContext<T>
    {
        IAndContraint<IPropertyControlContext<T>> ExecuteAssert(Func<T, bool> func, Func<IErrorMessageBuilder, IErrorMessageBuilder> messageBuilder);
    }
}