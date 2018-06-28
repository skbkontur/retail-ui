import warning from 'warning';

let flatDesignEnabled = false;
let sizeMedium16pxEnabled = false;

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
  }
};

export default Upgrade;
