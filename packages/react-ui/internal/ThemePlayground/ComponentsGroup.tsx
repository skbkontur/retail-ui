import React, { useContext } from 'react';

import { Gapped } from '../../components/Gapped';
import { Theme } from '../../lib/theming/Theme';
import { EmotionContext } from '../../lib/theming/Emotion';

import { getStyles } from './Playground.styles';

interface ComponentsGroupProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  theme: Theme;
}

export const ComponentsGroup = (props: ComponentsGroupProps): React.ReactElement<ComponentsGroupProps> => {
  const { title, children, style, theme } = props;
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

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
