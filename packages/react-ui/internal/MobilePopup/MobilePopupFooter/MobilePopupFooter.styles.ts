import type { Emotion } from '@emotion/css/create-instance';

import { memoizeGetStyles } from '../../../lib/theming/Emotion.js';
import type { Theme } from '../../../lib/theming/Theme.js';

export const getJsStyles = memoizeGetStyles(({ css }: Emotion) => {
  const rootBase_6_1 = (t: Theme) => css`
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

    rootSmall_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding: ${t.mobilePopupFooterPaddingSmall};
      `;
    },
    rootMedium_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding: ${t.mobilePopupFooterPaddingMedium};
      `;
    },
    rootLarge_6_1(t: Theme) {
      return css`
        ${rootBase_6_1(t)};
        padding: ${t.mobilePopupFooterPaddingLarge};
      `;
    },
  };
});
