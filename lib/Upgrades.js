// @flow

import warning from 'warning';

let flatDisignEnabled = false;

const Upgrade = {
  enableHeight34() {
    warning(false, 'Метод Upgrades.enableHeight34 устарел');
  },

  isHeight34Enabled() {
    return true;
  },

  enableFlatDisign() {
    flatDisignEnabled = true;
  },

  ifFlatDisignEnabled() {
    return flatDisignEnabled;
  }
};

export default Upgrade;
