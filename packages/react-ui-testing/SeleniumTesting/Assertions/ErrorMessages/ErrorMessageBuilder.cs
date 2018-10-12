using System;
using System.Collections.Generic;
using System.Text;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages.Expecations;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages
{
    internal class ErrorMessageBuilder : IErrorMessageBuilder
    {
        public IErrorMessageBuilder WithExpectation(IValueExpectationFormatter expectationFormatter)
        {
            this.expectationFormatter = expectationFormatter;
            return this;
        }

        public IErrorMessageBuilder WithActual(string actualValue)
        {
            actualValues.Add(actualValue);
            return this;
        }

        public IErrorMessageBuilder WithListQuantifier(string quantifier)
        {
            this.quantifier = quantifier;
            return this;
        }

        public IErrorMessageBuilder WithNegation()
        {
            this.negation = true;
            return this;
        }

        public IErrorMessageBuilder WithFailedToFindControl(ElementNotFoundException notFoundException)
        {
            this.notFoundException = notFoundException;
            return this;
        }

        public IErrorMessageBuilder WithSubject(ControlBase subject)
        {
            this.subject = subject;
            return this;
        }

        public IErrorMessageBuilder WithTimeout(TimeSpan timeout)
        {
            this.timeout = timeout;
            return this;
        }

        public string Build()
        {
            var result = new StringBuilder();
            result.AppendLine($"{GetTargetControlDescription()}: {GetErrorDescription()}");
            result.AppendLine($"Время ожидания: {GetTimeoutDescription()}.");
            return result.ToString();
        }

        private string GetErrorDescription()
        {
            var result = new StringBuilder();
            if(quantifier != null)
            {
                result.Append(quantifier + " ");
            }
            if(propertyDescription != null)
            {
                result.AppendFormat("поле {0} ", propertyDescription);
            }
            expectationFormatter.Format(result, new ActualContainer
                {
                    ActualValues = actualValues,
                    NotFoundMessage = notFoundException
                }, negation);
            return result.ToString();
        }

        private string GetTargetControlDescription()
        {
            return $"{subject.GetControlTypeDesription()}({subject.GetAbsolutePathBySelectors()})";
        }

        public IErrorMessageBuilder WithPropertyDescription(string target)
        {
            this.propertyDescription = target;
            return this;
        }

        private string GetTimeoutDescription()
        {
            return $"{(int)timeout.TotalMilliseconds}ms";
        }

        private ControlBase subject;
        private TimeSpan timeout;
        private string propertyDescription;
        private IValueExpectationFormatter expectationFormatter;
        private readonly List<string> actualValues = new List<string>();
        private string quantifier;
        private bool negation;
        private ElementNotFoundException notFoundException;
    }
}