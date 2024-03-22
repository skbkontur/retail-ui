import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

import { ClickableDataTids, ClickableProps } from './Clickable';
import { buttonLoadingIconStyles } from './ClickableButtonLoadingIcon.styles';

interface ClickableButtonLoadingIconProps extends Pick<ClickableProps, 'size'> {
  isCentered?: boolean;
}

export const ClickableButtonLoadingIcon = ({ size, isCentered = true }: ClickableButtonLoadingIconProps) => {
  return (
    <div data-tid={ClickableDataTids.spinner} className={cx({ [buttonLoadingIconStyles.buttonLoading()]: isCentered })}>
      <LoadingIcon size={size} />
    </div>
  );
};
