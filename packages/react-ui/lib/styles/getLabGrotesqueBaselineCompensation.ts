export const getLabGrotesqueBaselineCompensation = (
  fontSize: number,
  compensation: number,
  isChrome: boolean,
  isFirefox: boolean,
) => {
  if (fontSize < 16 && !isChrome) {
    return compensation;
  } else if ((fontSize === 16 && isChrome) || (fontSize === 18 && (isFirefox || isChrome))) {
    return -compensation;
  }

  return 0;
};
