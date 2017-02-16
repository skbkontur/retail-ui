// @flow

import warning from 'warning';

const Upgrade = {
  enableHeight34() {
    warning(false, 'Метод Upgrades.enableHeight34 устарел ' +
        'и в скором времени будет удален');
  },

  isHeight34Enabled() {
    return true;
  }
};

export default Upgrade;
