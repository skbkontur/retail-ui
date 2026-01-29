export function deferAction(action: () => void) {
  setTimeout(action, 1);
}

export const inlineProp = (name: string, value: boolean) => {
  const obj: Record<string, boolean> = {};
  obj[name] = value;
  return obj;
};

export const extractRef = (ref: React.RefObject<Element> | null) => (ref && 'current' in ref ? ref.current : ref);
