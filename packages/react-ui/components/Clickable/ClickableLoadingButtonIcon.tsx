import React from 'react';

import { LoadingIcon } from '../../internal/icons2022/LoadingIcon';

import { ClickableDataTids, ClickableProps } from './Clickable';
import { buttonStyles } from './ClickableButton.styles';

interface ClickableLoadingButtonIconProps extends Pick<ClickableProps, 'size'> {
  isCentered?: boolean;
}

export const ClickableLoadingButtonIcon = ({ size, isCentered = true }: ClickableLoadingButtonIconProps) => {
  return (
    <div data-tid={ClickableDataTids.spinner} className={isCentered ? buttonStyles.buttonLoading() : undefined}>
      <LoadingIcon size={size} />
    </div>
  );
};
