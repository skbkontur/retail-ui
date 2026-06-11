import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => {
  const rootBase6_1 = (t: Theme) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    background: ${t.menuBgDefault};
    border-bottom-left-radius: ${t.mobilePopupContainerBorderRadius};
    border-bottom-right-radius: ${t.mobilePopupContainerBorderRadius};
  `;

  return {
    root(t: Theme) {
      return css`
        position: relative;
        display: flex;
        flex-direction: column;
        background: ${t.menuBgDefault};
        padding: ${t.mobilePopupFooterPadding};
      `;
    },

    rootSmall6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding: ${t.mobilePopupFooterPaddingSmall};
      `;
    },
    rootMedium6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding: ${t.mobilePopupFooterPaddingMedium};
      `;
    },
    rootLarge6_1(t: Theme) {
      return css`
        ${rootBase6_1(t)};
        padding: ${t.mobilePopupFooterPaddingLarge};
      `;
    },
  };
});
