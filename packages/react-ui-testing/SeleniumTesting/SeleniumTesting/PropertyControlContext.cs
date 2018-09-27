using System;

using SKBKontur.SeleniumTesting.Assertions.ErrorMessages;

namespace SKBKontur.SeleniumTesting
{
    public class PropertyControlContext<TControl, T> : IPropertyControlContext<T> where TControl : ControlBase
    {
        public PropertyControlContext(
            IAssertable<TControl> subject,
            Func<TControl, T> propertyPicker,
            string target
            )
        {
            this.subject = subject;
            this.target = target;
            this.compiledPropertyPicker = propertyPicker;
        }

        public PropertyControlContext<TControl, T> Not()
        {
            this.negation = true;
            return this;
        }

        public IAndContraint<IPropertyControlContext<T>> ExecuteAssert(Func<T, bool> func, Func<IErrorMessageBuilder, IErrorMessageBuilder> messageBuilder)
        {
            if(negation)
            {
                subject.ExecuteAssert(
                    x => !func(compiledPropertyPicker(x)),
                    (x, m) =>
                        {
                            var result = messageBuilder(m).WithNegation().WithPropertyDescription(target);
                            if(x != null && x.IsPresentObsolete)
                                result.WithActual(compiledPropertyPicker(x).ToString());
                            return result;
                        }
                    );
                return new AndContraint<PropertyControlContext<TControl, T>>(this);
            }
            subject.ExecuteAssert(
                x => func(compiledPropertyPicker(x)),
                (x, m) =>
                    {
                        var result = messageBuilder(m).WithPropertyDescription(target);
                        if(x != null && x.IsPresentObsolete)
                        {
                            var value = compiledPropertyPicker(x);
                            var valueAsString = value != null ? value.ToString() : "<null>";
                            result.WithActual(valueAsString);
                        }

                        return result;
                    }
                );
            return new AndContraint<PropertyControlContext<TControl, T>>(this);
        }

        private readonly IAssertable<TControl> subject;
        private readonly string target;
        private readonly Func<TControl, T> compiledPropertyPicker;
        private bool negation;
    }
}