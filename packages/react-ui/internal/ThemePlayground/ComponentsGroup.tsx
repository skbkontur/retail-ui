import React from 'react';

import { Gapped } from '../../components/Gapped/index.js';
import { useStyles } from '../../lib/renderEnvironment/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { getStyles } from './Playground.styles.js';

interface ComponentsGroupProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  theme: Theme;
}

export const ComponentsGroup = (props: ComponentsGroupProps): React.ReactElement<ComponentsGroupProps> => {
  const { title, children, style, theme } = props;
  const styles = useStyles(getStyles);
  return (
    <Gapped wrap verticalAlign="top" gap={40}>
      <div className={styles.title(theme)} style={style}>
        {title}
      </div>
      <div className={styles.componentsGroup(theme)}>
        <Gapped wrap verticalAlign="middle" gap={10}>
          {children}
        </Gapped>
      </div>
    </Gapped>
  );
};
