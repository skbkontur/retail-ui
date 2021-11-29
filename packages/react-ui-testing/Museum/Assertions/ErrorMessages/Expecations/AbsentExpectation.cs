using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class AbsentExpectation : IValueExpectationFormatter
    {
        public void Format(StringBuilder result, ActualContainer actualContainer, bool negation)
        {
            result.Append(negation ? "ожидалось присутствие" : "ожидалось отсутствие");
        }
    }
}