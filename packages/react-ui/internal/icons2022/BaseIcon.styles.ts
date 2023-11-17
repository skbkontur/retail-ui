import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  centeredIcon() {
    // Такая запись используется намеренно смотри
    // https://github.com/skbkontur/retail-ui/pull/3316
    return css({
      display: 'inline-flex',
      alignItems: 'center',

      '::before': {
        content: `'${ZERO_WIDTH_SPACE_CSS}'`,
      },
    });
  },
});
