// @flow

import warning from 'warning';

let flatDesignEnabled = false;

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

  ifFlatDesignEnabled() {
    return flatDesignEnabled;
  }
};

export default Upgrade;
