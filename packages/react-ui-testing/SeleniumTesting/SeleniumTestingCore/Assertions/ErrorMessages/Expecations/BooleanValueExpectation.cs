using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class BooleanValueExpectation : IValueExpectationFormatter
    {
        public BooleanValueExpectation(bool value)
        {
            this.value = value;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            if(value)
                result.Append(negation ? "ожидалось ложным" : "ожидалось истиным");
            else
                result.Append(negation ? "ожидалось истиным" : "ожидалось ложным");
            result.Append($@", но {Helpers.FormatActualValues(actualValues)}");
        }

        private readonly bool value;
    }
}