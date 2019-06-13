import warning from 'warning';

let flatDesignEnabled = false;
let sizeMedium16pxEnabled = false;
let specificityLevel = 0;
let canModifySpecificityLevel = true;

const Upgrade = {
  enableFlatDesign() {
    warning(
      false,
      'Метод Upgrades.enableFlatDesign устарел. Используйте ThemeProvider или ThemeFactory.overrideDefaultTheme()',
    );
    flatDesignEnabled = true;
  },

  isFlatDesignEnabled() {
    return flatDesignEnabled;
  },

  enableSizeMedium16px() {
    warning(false, 'Метод Upgrades.enableSizeMedium16px устарел. Переопределите fontSizeMedium в теме через ThemeProvider или ThemeFactory.overrideDefaultTheme()');
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
  getSpecificityLevel() {
    canModifySpecificityLevel = false;
    return specificityLevel;
  },
  setSpecificityLevel(level: number) {
    if (canModifySpecificityLevel) {
      specificityLevel = level;
    } else {
      warning(false, `specificityLevel=${specificityLevel} уже использован`);
    }
  },
};

export default Upgrade;
