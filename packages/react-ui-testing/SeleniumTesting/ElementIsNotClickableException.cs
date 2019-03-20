using System;

namespace SKBKontur.SeleniumTesting
{
    public class ElementIsNotClickableException : ControlElementException
    {
        public ElementIsNotClickableException(ControlBase control, ISearchContainer container, Type getType, ISelector selector, Exception exception)
            : base($"Элемент {getType} по правилу {selector} внутри элемента {container.GetType().Name} невозможно кликнуть", control, container, getType, selector, exception)
        {
        }
    }
}