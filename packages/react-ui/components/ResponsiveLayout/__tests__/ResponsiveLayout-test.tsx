import {
  addResponsiveLayoutListener,
  removeResponsiveLayoutListener,
  eventListenersMap,
} from '../ResponsiveLayoutEvents';

describe('ResponsiveLayoutListeners', () => {
  it('test func', () => {
    const firstMediaQuery = '(min-width: 1px)';
    const secondMediaQuery = '(min-width: 5px)';
    const thirdMediaQuery = '(min-width: 10px)';

    const firstObj = {};
    const secondObj = {};
    const thirdObj = {};

    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const thirdCallback = jest.fn();

    // создаем два слушателя по первому медиа-запросу

    addResponsiveLayoutListener(firstMediaQuery, firstObj, firstCallback);
    addResponsiveLayoutListener(firstMediaQuery, secondObj, secondCallback);

    expect(eventListenersMap.size).toBe(1);

    const firstValue = eventListenersMap.get(firstMediaQuery);

    expect(firstValue).toBeDefined();
    expect(firstValue?.mql.media).toBe(firstMediaQuery);
    expect(firstValue?.listeners).toHaveLength(2);

    expect(firstValue?.listeners[0].id).toBe(firstObj);
    expect(firstValue?.listeners[0].callback).toBe(firstCallback);

    expect(firstValue?.listeners[1].id).toBe(secondObj);
    expect(firstValue?.listeners[1].callback).toBe(secondCallback);

    // добавляем одного слушателя по второму медиа-запросу

    addResponsiveLayoutListener(secondMediaQuery, secondObj, secondCallback);

    expect(eventListenersMap.size).toBe(2);

    const secondValue = eventListenersMap.get(secondMediaQuery);

    expect(secondValue).toBeDefined();
    expect(secondValue?.mql.media).toBe(secondMediaQuery);
    expect(secondValue?.listeners).toHaveLength(1);

    expect(secondValue?.listeners[0].id).toBe(secondObj);
    expect(secondValue?.listeners[0].callback).toBe(secondCallback);
    expect(secondValue?.listeners[1]).toBeUndefined();

    // добавляем три слушаетля на третий медиа-запрос

    addResponsiveLayoutListener(thirdMediaQuery, firstObj, firstCallback);
    addResponsiveLayoutListener(thirdMediaQuery, secondObj, secondCallback);
    addResponsiveLayoutListener(thirdMediaQuery, thirdObj, thirdCallback);

    expect(eventListenersMap.size).toBe(3);

    const thirdValue = eventListenersMap.get(thirdMediaQuery);

    expect(thirdValue).toBeDefined();
    expect(thirdValue?.mql.media).toBe(thirdMediaQuery);
    expect(thirdValue?.listeners).toHaveLength(3);

    expect(thirdValue?.listeners[0].id).toBe(firstObj);
    expect(thirdValue?.listeners[0].callback).toBe(firstCallback);

    expect(thirdValue?.listeners[1].id).toBe(secondObj);
    expect(thirdValue?.listeners[1].callback).toBe(secondCallback);

    expect(thirdValue?.listeners[2].id).toBe(thirdObj);
    expect(thirdValue?.listeners[2].callback).toBe(thirdCallback);

    expect(secondValue?.listeners[3]).toBeUndefined();

    // удаляем слушателя по второму медиа-запросу. Размер словаря должен стать два

    removeResponsiveLayoutListener(secondMediaQuery, secondObj);

    expect(eventListenersMap.size).toBe(2);
    expect(eventListenersMap.get(secondMediaQuery)).toBeUndefined();

    // удаляем одного слушателя по первому медиа-запросу

    removeResponsiveLayoutListener(firstMediaQuery, firstObj);
    expect(eventListenersMap.size).toBe(2);

    const newFirstValue = eventListenersMap.get(firstMediaQuery);

    expect(newFirstValue).toBeDefined();
    expect(newFirstValue?.mql.media).toBe(firstMediaQuery);
    expect(newFirstValue?.listeners).toHaveLength(1);
    expect(newFirstValue?.listeners[0].id).toBe(secondObj);
    expect(newFirstValue?.listeners[0].callback).toBe(secondCallback);

    // удаляем всех слушателей

    removeResponsiveLayoutListener(firstMediaQuery, secondObj);
    expect(eventListenersMap.size).toBe(1);

    removeResponsiveLayoutListener(thirdMediaQuery, firstObj);
    removeResponsiveLayoutListener(thirdMediaQuery, secondObj);

    expect(eventListenersMap.size).toBe(1);
    expect(eventListenersMap.get(thirdMediaQuery)?.listeners).toHaveLength(1);

    removeResponsiveLayoutListener(thirdMediaQuery, thirdObj);

    expect(eventListenersMap.size).toBe(0);
  });
});
