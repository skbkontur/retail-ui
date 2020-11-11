import React, { FC, ReactNode, useContext } from 'react';
import { HelpDot } from '@skbkontur/react-icons';

import { PopupPosition as TooltipPosition } from '../../internal/Popup';
import { ThemeContext, Tooltip } from '../..';

import { jsStyles } from './Textarea.styles';

export type TextareaCounterHelpProps = {
  tooltipContent: ReactNode;
  pos?: TooltipPosition;
  allowedPositions?: TooltipPosition[];
  icon?: ReactNode;
};

export const TextareaCounterHelp: FC<TextareaCounterHelpProps> = props => {
  const { icon, tooltipContent, allowedPositions, pos } = props;
  const { textareaCounterDefaultHelpColor } = useContext(ThemeContext);
  const defaultIcon = <HelpDot color={textareaCounterDefaultHelpColor} />;

  return (
    <section className={jsStyles.counterHelp()}>
      <Tooltip
        pos={pos ?? 'right bottom'}
        trigger={'click'}
        allowedPositions={allowedPositions}
        render={() => tooltipContent}
      >
        {icon ?? defaultIcon}
      </Tooltip>
    </section>
  );
};
