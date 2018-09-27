using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class ArraysEquivalentExpectation : IValueExpectationFormatter
    {
        public ArraysEquivalentExpectation(string[] expectedValues)
        {
            this.expectedValues = expectedValues;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.Append(negation ? "ожидались значения не эквивалентные" : "ожидалось значения эквивалентные");
            result.AppendLine(": ");
            result.Append(Helpers.FormatStringValues(expectedValues, 2));
            result.Append($@", но {Helpers.FormatActualValues(actualValues)}");
        }

        private readonly string[] expectedValues;
    }
}