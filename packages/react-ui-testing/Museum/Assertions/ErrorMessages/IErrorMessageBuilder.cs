using System;

namespace SKBKontur.SeleniumTesting.Assertions.ErrorMessages
{
    public interface IErrorMessageBuilder
    {
        IErrorMessageBuilder WithSubject(ControlBase subject);
        IErrorMessageBuilder WithTimeout(TimeSpan timeout);
        IErrorMessageBuilder WithPropertyDescription(string target);
        IErrorMessageBuilder WithActual(string actualValue);
        IErrorMessageBuilder WithExpectation(IValueExpectationFormatter expectationFormatter);
        IErrorMessageBuilder WithListQuantifier(string quantifier);
        IErrorMessageBuilder WithNegation();
        IErrorMessageBuilder WithFailedToFindControl(ElementNotFoundException errorMessageBuilder);

        string Build();
    }
}