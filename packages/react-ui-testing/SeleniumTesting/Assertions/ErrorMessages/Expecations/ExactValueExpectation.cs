using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class ExactValueExpectation : IValueExpectationFormatter
    {
        public ExactValueExpectation(string expected)
        {
            this.expected = expected;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.AppendLine(negation ? "ожидалось не равным:" : "ожидалось равным:");
            result.Append($@"  '{expected}', но {Helpers.FormatActualValues(actualValues)}");
        }

        private readonly string expected;
    }
}