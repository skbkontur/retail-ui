import warning from 'warning';

let flatDesignEnabled = false;
let sizeMedium16pxEnabled = false;
let adaptiveStyles = false;

const Upgrade = {
  enableHeight34() {
    warning(false, 'Метод Upgrades.enableHeight34 устарел');
  },

  isHeight34Enabled() {
    return true;
  },

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
    adaptiveStyles = enabled;
  },

  isAdaptiveStyles() {
    return adaptiveStyles;
  },
};

export default Upgrade;
