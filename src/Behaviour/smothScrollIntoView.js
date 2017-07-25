// @flow

export default (async function smothScrollIntoView(element: HTMLElement, topOffset: number): Promise<void> {
    var scrollableParent = findScrollableParent(element);
    var parentRects = scrollableParent.getBoundingClientRect();
    var clientRects = element.getBoundingClientRect();

    if (scrollableParent !== document.body) {
        if (clientRects.top - topOffset + 50 > parentRects.top && clientRects.bottom < parentRects.bottom) {
            return;
        }

        await smoothScroll(
            scrollableParent,
            scrollableParent.scrollLeft + clientRects.left - parentRects.left,
            scrollableParent.scrollTop + clientRects.top - parentRects.top - topOffset,
        );
        await scrollBy({
            left: parentRects.left,
            top: parentRects.top,
        });
    } else {
        if (isElementInViewport(element)) {
            return;
        }
        await scrollBy({
            left: clientRects.left,
            top: clientRects.top - topOffset,
        });
    }
    return;
});

function smoothScroll(element: HTMLElement, x: number, y: number): Promise<void> {
    let context;
    if (element === getDocumentBodyStrict()) {
        context = {
            scrollable: window,
            startX: window.scrollX || window.pageXOffset,
            startY: window.scrollY || window.pageYOffset,
            method: (_, x, y) => scrollWindow(x, y),
            startTime: now(),
            x: x,
            y: y,
        };
    } else {
        context = {
            scrollable: element,
            startX: element.scrollLeft,
            startY: element.scrollTop,
            method: scrollElement,
            startTime: now(),
            x: x,
            y: y,
        };
    }

    return new Promise(resolve => step({ ...context, resolve: resolve }));
}

type StepContent = {
    scrollable: HTMLElement,
    startTime: number,
    startX: number,
    startY: number,
    x: number,
    y: number,
    method: (element: Element, x: number, y: number) => void,
    resolve: () => void,
};

function step(context: StepContent) {
    const time = now();
    const elapsed = Math.min(1, (time - context.startTime) / ScrollTime);
    const value = ease(elapsed);

    const currentX = context.startX + (context.x - context.startX) * value;
    const currentY = context.startY + (context.y - context.startY) * value;

    context.method(context.scrollable, currentX, currentY);

    if (currentX !== context.x || currentY !== context.y) {
        window.requestAnimationFrame(() => step(context));
    } else {
        context.resolve();
    }
}

const ScrollTime = 468;

const scrollWindow =
    typeof window.scroll === 'function'
        ? (x: number, y: number) => window.scroll(x, y)
        : (x: number, y: number) => window.scrollTo(x, y);

const now = window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now;

function scrollElement(element: Element, x: number, y: number) {
    element.scrollLeft = x;
    element.scrollTop = y;
}

function ease(time: number): number {
    return 0.5 * (1 - Math.cos(Math.PI * time));
}

function getDocumentBodyStrict(): HTMLElement {
    if (document.body == null) {
        throw new Error('Scrolling can be used only in browser');
    }
    return document.body;
}

function findScrollableParent(el: HTMLElement): HTMLElement {
    let isBody: ?boolean;
    let hasScrollableSpace: ?boolean;
    let hasVisibleOverflow: ?boolean;
    let currentElement: HTMLElement = el;
    do {
        if (currentElement.parentElement == null || !(currentElement.parentElement instanceof HTMLElement)) {
            return getDocumentBodyStrict();
        }
        currentElement = currentElement.parentElement;
        isBody = currentElement === document.body;
        hasScrollableSpace =
            currentElement.clientHeight < currentElement.scrollHeight ||
            currentElement.clientWidth < currentElement.scrollWidth;
        hasVisibleOverflow = window.getComputedStyle(currentElement, null).overflow === 'visible';
    } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));

    isBody = hasScrollableSpace = hasVisibleOverflow = null;

    return currentElement;
}

function scrollBy({ left, top }): Promise<void> {
    return smoothScroll(
        getDocumentBodyStrict(),
        ~~left + (window.scrollX || window.pageXOffset),
        ~~top + (window.scrollY || window.pageYOffset),
    );
}

function isElementInViewport(el: HTMLElement): boolean {
    let currentElement = el;
    var top = currentElement.offsetTop;
    var left = currentElement.offsetLeft;
    var width = currentElement.offsetWidth;
    var height = currentElement.offsetHeight;

    while (currentElement.offsetParent) {
        const offsetParent = currentElement.offsetParent;
        if (offsetParent instanceof HTMLElement) {
            currentElement = offsetParent;
            top += currentElement.offsetTop;
            left += currentElement.offsetLeft;
        } else {
            break;
        }
    }

    return (
        top >= window.scrollTop &&
        left >= window.scrollLeft &&
        top + height <= window.scrollTop + window.innerHeight &&
        left + width <= window.scrollLeft + window.innerWidth
    );
}
