// @flow

import warning from 'warning';

let height34 = false;
let warnedHeight34 = false;

const Upgrade = {
  enableHeight34() {
    height34 = true;
  },

  isHeight34Enabled() {
    if (!height34 && !warnedHeight34) {
      warning(false, 'Включи новую высоту компонентов, а то скоро она ' +
        'включится сама: https://staff.skbkontur.ru' +
        '/group/1902?m=article-56effb0b339efc04c09e66d9');
      warnedHeight34 = true;
    }

    return height34;
  },
};

export default Upgrade;
