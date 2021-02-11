import React from 'react';

import { Gapped } from '../../components/Gapped';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './Playground.styles';

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
      <div className={jsStyles.title(theme)} style={style}>
        {title}
      </div>
      <div className={jsStyles.componentsGroup(theme)}>
        <Gapped wrap verticalAlign="middle" gap={10}>
          {children}
        </Gapped>
      </div>
    </Gapped>
  );
};
