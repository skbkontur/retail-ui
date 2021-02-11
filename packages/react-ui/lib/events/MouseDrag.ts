import { canUseDOM } from '../client';

enum MouseDragEventType {
  Start = 'mousedragstart',
  Move = 'mousedragmove',
  End = 'mousedragend',
  Leave = 'mousedragleave',
}

type MouseDragEvent = MouseEvent;

type HandlerNative<E = MouseEvent> = (e: E) => void;
type Handler = (e: MouseDragEvent) => void;
type On = (handler: Handler) => MouseDrag;
export type MouseDragEventHandler = (e: MouseDragEvent) => void;

const items: Map<HTMLElement, MouseDrag> = new Map();

const documentHandleMouseUp: HandlerNative = e => items.forEach(mouseDrag => mouseDrag.handleMouseUp(e));

if (canUseDOM) {
  document.documentElement.addEventListener('mouseup', documentHandleMouseUp);
}

/**
 * ## Класс для отслеживания эффекта перетаскивания мышкой
 *
 * _Публичный метод `handleMouseUp` нельзя использовать!_
 *
 * ### Начало прослушивания и добавление обработчиков:
 * ```
 *   MouseDrag.listen(HTMLElement_1)
 *     .onMouseDragStart(start)
 *     .onMouseDragMove(move)
 *     .onMouseDragLeave(leave)
 *     .onMouseDragEnd(end);
 *
 * - - ИЛИ - -
 *
 *  const mouseDrag_1 = MouseDrag.listen(HTMLElement)...
 * ```
 *
 * ### Остановка прослушивания:
 * ```
 *   MouseDrag.stop(HTMLElement_1)
 *
 * - - ИЛИ - -
 *
 *   mouseDrag_1.stop();
 * ```
 */
export class MouseDrag {
  // Радиус окружности, который необходимо преодолеть мышью, чтобы вызвалось событие `MouseDragStart`
  public static readonly RADIUS: number = 5; // px

  public static listen = (elem: HTMLElement): MouseDrag => {
    if (items.has(elem)) {
      const mouseDrag = items.get(elem);
      if (mouseDrag) {
        return mouseDrag;
      }
    }
    return new MouseDrag(elem);
  };

  public static stop = (elem: HTMLElement | null): void => {
    if (elem && items.has(elem)) {
      const mouseDrag = items.get(elem);
      if (mouseDrag) {
        mouseDrag.stop();
      }
    }
  };

  private mouseDragStartEvent?: MouseDragEvent;
  private clicked = false;
  private dragging = false;

  private x1?: number;
  private y1?: number;

  private elem: HTMLElement | null;

  public constructor(elem: HTMLElement) {
    this.elem = elem;
    this.elem.addEventListener('mousedown', this.handleMouseDown);
    this.elem.addEventListener('mousemove', this.handleMouseMove);
    this.elem.addEventListener('mouseleave', this.handleMouseLeave);
    items.set(this.elem, this);
  }

  public stop = (): void => {
    if (this.elem !== null) {
      this.elem.removeEventListener('mousedown', this.handleMouseDown);
      this.elem.removeEventListener('mousemove', this.handleMouseMove);
      this.elem.removeEventListener('mouseleave', this.handleMouseLeave);
      items.delete(this.elem);
    }
    this.elem = null;
  };

  public onMouseDragStart: On = handler => this.on(MouseDragEventType.Start, handler);
  public onMouseDragMove: On = handler => this.on(MouseDragEventType.Move, handler);
  public onMouseDragLeave: On = handler => this.on(MouseDragEventType.Leave, handler);
  public onMouseDragEnd: On = handler => this.on(MouseDragEventType.End, handler);

  public handleMouseUp: HandlerNative = e => {
    this.clicked = false;
    if (this.dragging) {
      this.dragging = false;
      this.dispatchEvent(this.createEvent(MouseDragEventType.End, e));
    }
  };

  private on = (type: MouseDragEventType, handler: Handler): MouseDrag => {
    if (this.elem !== null) {
      this.elem.removeEventListener(type, handler as HandlerNative<Event>);
      this.elem.addEventListener(type, handler as HandlerNative<Event>);
    }
    return this;
  };

  private handleMouseDown: HandlerNative = e => {
    if (!this.clicked) {
      this.clicked = true;
      this.x1 = e.pageX;
      this.y1 = e.pageY;
      this.mouseDragStartEvent = this.createEvent(MouseDragEventType.Start, e);
    }
  };

  private handleMouseMove: HandlerNative = e => {
    if (this.dragging) {
      return this.dispatchEvent(this.createEvent(MouseDragEventType.Move, e));
    }
    if (this.clicked && this.getLength(e.pageX, e.pageY) > MouseDrag.RADIUS) {
      this.dragging = true;
      this.clicked = false;
      if (this.mouseDragStartEvent) {
        this.dispatchEvent(this.mouseDragStartEvent);
      }
    }
  };

  private handleMouseLeave: HandlerNative = e => {
    if (this.dragging) {
      this.dispatchEvent(this.createEvent(MouseDragEventType.Leave, e));
    }
  };

  private getLength = (x2: number, y2: number): number => {
    return this.x1 !== undefined && this.y1 !== undefined ? Math.sqrt((x2 - this.x1) ** 2 + (y2 - this.y1) ** 2) : 0;
  };

  private createEvent = (type: MouseDragEventType, e: MouseEvent): MouseDragEvent => {
    if (typeof MouseEvent === 'function') {
      return new MouseEvent(type, e);
    }
    // <=IE11
    const eIE11 = document.createEvent('MouseEvent');
    eIE11.initEvent(type, true, true);
    return eIE11;
  };

  private dispatchEvent = (mouseDragEvent: MouseDragEvent): void => {
    if (this.elem !== null) {
      this.elem.dispatchEvent(mouseDragEvent);
    }
  };
}
