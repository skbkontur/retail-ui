using System.Text;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations
{
    internal class CustomMessageExpectation : IValueExpectationFormatter
    {
        public CustomMessageExpectation(string customText)
        {
            this.customText = customText;
        }

        public void Format(StringBuilder result, ActualContainer actualValues, bool negation)
        {
            result.Append(customText);
        }

        private readonly string customText;
    }
}