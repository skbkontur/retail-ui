export const getLabGrotesqueBaselineCompensation = (fontSize: number, compensation: number, isChrome: boolean) => {
  if (fontSize < 16 && !isChrome) {
    return compensation;
  } else if (fontSize === 16 && isChrome) {
    return -compensation;
  }

  return 0;
};
