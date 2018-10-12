using System.Text;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages
{
    public interface IValueExpectationFormatter
    {
        void Format(StringBuilder result, ActualContainer actualValues, bool negation);
    }
}