import { addResponsiveLayoutListener, eventListenersMap, listenerToken } from '../ResponsiveLayoutEvents';

describe('ResponsiveLayoutListeners', () => {
  it('test func', () => {
    const firstMediaQuery = '(min-width: 1px)';
    const secondMediaQuery = '(min-width: 5px)';
    const thirdMediaQuery = '(min-width: 10px)';

    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const thirdCallback = jest.fn();

    // создаем два слушателя по первому медиа-запросу

    const firstMQListeners: listenerToken[] = [];
    firstMQListeners.push(addResponsiveLayoutListener(firstMediaQuery, firstCallback));
    firstMQListeners.push(addResponsiveLayoutListener(firstMediaQuery, secondCallback));

    expect(firstMQListeners).toHaveLength(2);
    expect(eventListenersMap.size).toBe(1);

    const firstValue = eventListenersMap.get(firstMediaQuery);

    expect(firstValue).toBeDefined();
    expect(firstValue?.mql.media).toBe(firstMediaQuery);
    expect(firstValue?.listeners).toHaveLength(2);

    expect(firstValue?.listeners[0]).toBe(firstCallback);
    expect(firstValue?.listeners[1]).toBe(secondCallback);

    // добавляем одного слушателя по второму медиа-запросу

    const secondMQListeners: listenerToken[] = [];

    secondMQListeners.push(addResponsiveLayoutListener(secondMediaQuery, secondCallback));

    expect(secondMQListeners).toHaveLength(1);
    expect(eventListenersMap.size).toBe(2);

    const secondValue = eventListenersMap.get(secondMediaQuery);

    expect(secondValue).toBeDefined();
    expect(secondValue?.mql.media).toBe(secondMediaQuery);
    expect(secondValue?.listeners).toHaveLength(1);

    expect(secondValue?.listeners[0]).toBe(secondCallback);
    expect(secondValue?.listeners[1]).toBeUndefined();

    // добавляем три слушателя на третий медиа-запрос

    const thirdMQListeners: listenerToken[] = [];

    thirdMQListeners.push(addResponsiveLayoutListener(thirdMediaQuery, firstCallback));
    thirdMQListeners.push(addResponsiveLayoutListener(thirdMediaQuery, secondCallback));
    thirdMQListeners.push(addResponsiveLayoutListener(thirdMediaQuery, thirdCallback));

    expect(thirdMQListeners).toHaveLength(3);
    expect(eventListenersMap.size).toBe(3);

    const thirdValue = eventListenersMap.get(thirdMediaQuery);

    expect(thirdValue).toBeDefined();
    expect(thirdValue?.mql.media).toBe(thirdMediaQuery);
    expect(thirdValue?.listeners).toHaveLength(3);

    expect(thirdValue?.listeners[0]).toBe(firstCallback);
    expect(thirdValue?.listeners[1]).toBe(secondCallback);
    expect(thirdValue?.listeners[2]).toBe(thirdCallback);
    expect(secondValue?.listeners[3]).toBeUndefined();

    // удаляем слушателя по второму медиа-запросу. Размер словаря должен стать два

    secondMQListeners[0].remove();

    expect(eventListenersMap.size).toBe(2);
    expect(eventListenersMap.get(secondMediaQuery)).toBeUndefined();

    // удаляем одного слушателя по первому медиа-запросу

    firstMQListeners[0].remove();
    expect(eventListenersMap.size).toBe(2);

    const updatedFirstValue = eventListenersMap.get(firstMediaQuery);

    expect(updatedFirstValue).toBeDefined();
    expect(updatedFirstValue?.mql.media).toBe(firstMediaQuery);
    expect(updatedFirstValue?.listeners).toHaveLength(1);
    expect(updatedFirstValue?.listeners[0]).toBe(secondCallback);

    // удаляем всех слушателей

    firstMQListeners[1].remove();
    expect(eventListenersMap.size).toBe(1);

    thirdMQListeners[0].remove();
    thirdMQListeners[1].remove();

    expect(eventListenersMap.size).toBe(1);
    expect(eventListenersMap.get(thirdMediaQuery)?.listeners).toHaveLength(1);

    thirdMQListeners[2].remove();

    expect(eventListenersMap.size).toBe(0);
  });
});
