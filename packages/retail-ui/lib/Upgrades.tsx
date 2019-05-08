import warning from 'warning';

let flatDesignEnabled = false;
let sizeMedium16pxEnabled = false;

const Upgrade = {
  enableFlatDesign() {
    warning(false, 'Метод Upgrades.enableFlatDesign устарел. Используйте ThemeProvider или ThemeFactory.overrideDefaultTheme()');
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
    warning(false, 'Метод Upgrades.setAdaptiveStyles устарел. `adaptiveStyles` включен всегда');
  },

  isAdaptiveStyles() {
    return true;
  },
};

export default Upgrade;
