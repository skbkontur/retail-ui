using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class CustomStringExpectation : IValueExpectationFormatter
    {
        public CustomStringExpectation(string expectsText, string negationExpectText, string expectedValue)
        {
            this.expectsText = expectsText;
            this.negationExpectText = negationExpectText;
            this.expectedValue = expectedValue;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.Append(negation ? negationExpectText : expectsText);
            if(expectedValue != null)
            {
                result.AppendLine(": ");
                result.Append(expectedValue);
            }

            result.Append($@", но {Helpers.FormatActualValues(actualValues)}");
        }

        private readonly string expectsText;
        private readonly string negationExpectText;
        private readonly string expectedValue;
    }
}