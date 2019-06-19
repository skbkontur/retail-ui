import warning from 'warning';

let specificityLevel = 0;
let canModifySpecificityLevel = true;

const Upgrade = {
  enableFlatDesign() {
    warning(
      false,
      'Метод Upgrades.enableFlatDesign устарел. Используйте ThemeProvider или ThemeFactory.overrideDefaultTheme()',
    );
  },

  isFlatDesignEnabled() {
    return false;
  },

  enableSizeMedium16px() {
    warning(
      false,
      'Метод Upgrades.enableSizeMedium16px() устарел. Переопределите fontSizeMedium в теме через ThemeProvider или ThemeFactory.overrideDefaultTheme()',
    );
  },

  isSizeMedium16pxEnabled() {
    warning(
      false,
      'Метод Upgrades.isSizeMedium16pxEnabled() устарел. Переопределите fontSizeMedium в теме через ThemeProvider или ThemeFactory.overrideDefaultTheme()',
    );
    return false;
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
