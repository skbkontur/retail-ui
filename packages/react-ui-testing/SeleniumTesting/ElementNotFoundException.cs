using System;

namespace SKBKontur.SeleniumTesting
{
    public class ElementNotFoundException : ControlElementException
    {
        public ElementNotFoundException(ControlBase control, ISearchContainer container, Type getType, ISelector selector, Exception exception)
            : base($"Элемент {getType} по правилу {selector} не найден внутри элемента {container.GetType().Name}", control, container, getType, selector, exception)
        {
        }
    }
}