import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface IUseDropProps {
  onDrop: (event: Event) => void;
}

interface IUseDropResult {
  isDraggable: boolean;
  ref: MutableRefObject<HTMLDivElement|null>;
}

export const useDrop = (props: IUseDropProps): IUseDropResult => {
  const {onDrop} = props;

  const droppableRef = useRef<HTMLDivElement>(null);
  const enterCounter = useRef<number>(0);
  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const handleDragOver = useCallback(event => {
    event.preventDefault();
  }, []);

  const preventDefault = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(event => {
    preventDefault(event);
    enterCounter.current++;
    setIsDraggable(true);
  }, [preventDefault]);

  const handleDragLeave = useCallback(event => {
    enterCounter.current--;
    if (enterCounter.current === 0) {
      setIsDraggable(false);
    }
  }, []);

  const handleDrop = useCallback((event: Event) => {
    preventDefault(event);
    setIsDraggable(false);
    enterCounter.current = 0;

    onDrop(event);
  }, [preventDefault, onDrop]);

  useEffect(() => {
    const ref = droppableRef.current;

    if (!ref) return;

    ref.addEventListener("dragenter", handleDragEnter);
    ref.addEventListener("dragleave", handleDragLeave);
    ref.addEventListener("drop", handleDrop);
    ref.addEventListener("dragover", handleDragOver);

    return () => {
      ref.removeEventListener("dragenter", handleDragEnter);
      ref.removeEventListener("dragleave", handleDragLeave);
      ref.removeEventListener("drop", handleDrop);
      ref.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  return {isDraggable, ref: droppableRef};
};
