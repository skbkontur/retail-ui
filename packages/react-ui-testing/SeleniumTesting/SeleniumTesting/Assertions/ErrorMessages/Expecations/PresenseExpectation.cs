using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class PresenseExpectation : IValueExpectationFormatter
    {
        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.Append(negation ? "ожидалось отсутствие" : "ожидалось присутствие");
        }
    }
}