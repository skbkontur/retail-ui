let index = 0;

export const getGuid = (): string => {
  return `${+new Date()}_${++index}`;
};
