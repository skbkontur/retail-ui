let index = 0;

export const getUid = (): string => {
  return `${+new Date()}_${++index}`;
};
