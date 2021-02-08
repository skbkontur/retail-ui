export const truncate = (truncateString: string, maxLength: number, separator = '...') => {
  if (truncateString.length <= maxLength) return truncateString;

  const separatorLength = separator.length;
  const charsCountToShow = maxLength - separatorLength;

  const frontCharsCount = Math.ceil(charsCountToShow/2);
  const backCharsCount = Math.floor(charsCountToShow/2);

  return `${truncateString.substr(0, frontCharsCount)}${separator}${truncateString.substr(truncateString.length - backCharsCount)}`;
};
