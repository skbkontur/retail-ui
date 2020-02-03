import React from 'react';

import { css, cx } from '../../../lib/theming/Emotion';
import { Gapped } from '../../Gapped';
import { Theme } from '../../../lib/theming/Theme';

import styles from './styles.module.less';

interface ComponentsGroupProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  theme: Theme;
}

export const ComponentsGroup = (props: ComponentsGroupProps): React.ReactElement<ComponentsGroupProps> => {
  const { title, children, style, theme } = props;
  return (
    <Gapped wrap verticalAlign="top" gap={40}>
      <div
        className={cx(
          styles.title,
          css`
            color: ${theme.textColorMain};
          `,
        )}
        style={style}
      >
        {title}
      </div>
      <div
        className={cx(
          styles.componentsGroup,
          css`
            color: ${theme.textColorMain};
          `,
        )}
      >
        <Gapped wrap verticalAlign="middle" gap={10}>
          {children}
        </Gapped>
      </div>
    </Gapped>
  );
};
