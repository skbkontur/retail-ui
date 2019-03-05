import warning from 'warning';

let flatDesignEnabled = false;
let sizeMedium16pxEnabled = false;
let adaptiveStyles = true;

const Upgrade = {
  enableFlatDesign() {
    flatDesignEnabled = true;
  },

  isFlatDesignEnabled() {
    return flatDesignEnabled;
  },

  enableSizeMedium16px() {
    sizeMedium16pxEnabled = true;
  },

  isSizeMedium16pxEnabled() {
    return sizeMedium16pxEnabled;
  },

  setAdaptiveStyles(enabled: boolean) {
    warning(false, 'Метод Upgrades.setAdaptiveStyles устарел. `adaptiveStyles` включен по умолчанию');
    adaptiveStyles = enabled;
  },

  isAdaptiveStyles() {
    return adaptiveStyles;
  },
};

export default Upgrade;
