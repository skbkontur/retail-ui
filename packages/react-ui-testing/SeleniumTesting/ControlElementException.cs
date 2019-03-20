using System;

namespace SKBKontur.SeleniumTesting
{
    public class ControlElementException : Exception
    {
        public ControlElementException(string message, ControlBase control, ISearchContainer container, Type getType, ISelector selector, Exception exception)
            : base(message, exception)
        {
            Control = control;
            Container = container;
            ControlType = getType;
            ControlSelector = selector;
        }

        public ControlBase Control { get; set; }
        public ISearchContainer Container { get; set; }
        public Type ControlType { get; set; }
        public ISelector ControlSelector { get; set; }
    }
}