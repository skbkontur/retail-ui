using System;

namespace SKBKontur.SeleniumTesting
{
    public class ElementNotFoundException : Exception
    {
        public ElementNotFoundException(ControlBase control, ISearchContainer container, Type getType, ISelector selector, Exception exception)
            : base($"Элемент {getType} по правилу {selector} не найден внутри элемента {container.GetType().Name}", exception)
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