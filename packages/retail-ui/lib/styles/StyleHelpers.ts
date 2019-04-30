function shiftVariableValue(value: string, shift: string): string {
  if (typeof value !== 'string' || !value || !shift) {
    return value;
  }
  const unitSymbolsArray = value.match(/[a-z]|%/g) || [];
  const unit = unitSymbolsArray.join('');
  return `${parseFloat(value) + parseFloat(shift)}${unit || 'px'}`;
}

export { shiftVariableValue };
