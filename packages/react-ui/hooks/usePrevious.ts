import React from 'react';

export const usePrevious = (primitive: string | number | undefined | null | boolean) => {
  const prevRef = React.useRef<typeof primitive>();
  React.useEffect(() => {
    prevRef.current = primitive;
  }, [primitive]);
  return prevRef.current;
};
