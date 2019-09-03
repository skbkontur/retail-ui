const EPS = 0.00001;
const DimensionFunctions = {
  shift(value: string, shift: string): string {
    if (typeof value !== 'string' || !value || !shift) {
      return value;
    }
    const unitSymbolsArray = value.match(/[a-z]|%/g) || [];
    const unit = unitSymbolsArray.join('');
    const floatNumber = parseFloat(value) + parseFloat(shift);
    const intNumber = parseInt(`${floatNumber}`, 10);
    const result = floatNumber % intNumber < EPS ? intNumber : Math.round(floatNumber * 10000) / 10000;
    return `${result}${unit || 'px'}`;
  },
};
export default DimensionFunctions;
