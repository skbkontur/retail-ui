export const clearTimer = (timer: number | undefined) => {
  clearTimeout(timer);
  timer = undefined;
};
