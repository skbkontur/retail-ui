import React, { useState, useEffect } from 'react';

const ActiveElementComponent: React.FC = () => {
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [counterElement, setCounterElement] = useState<number>(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const elem = document.activeElement;
      setActiveElement(elem);
      setCounterElement(counterElement+1);
    }, 1000);
    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div style={{width: '200px'}}>
      <div>
        {counterElement}
      </div>
      Текущий активный элемент: {activeElement?.outerHTML || 'Нет активного элемента'}
    </div>
  );
};

export default ActiveElementComponent;
