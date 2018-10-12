using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class ContainsValueExpectation : IValueExpectationFormatter
    {
        public ContainsValueExpectation(string expected)
        {
            this.expected = expected;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.AppendLine(negation ? "ожидалось что не будет содержать:" : "ожидалось что будет содержать:");
            result.Append($@"  '{expected}', но {Helpers.FormatActualValues(actualValues)}");
        }

        private readonly string expected;
    }
}