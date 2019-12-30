import React from 'react';
import { css, cx } from '../../../lib/theming/Emotion';
import styles from './styles.module.less';
import { Gapped } from '../../Gapped';
import { Theme } from '../../../lib/theming/Theme';

interface ComponentsGroupProps {
  title: string;
  components: Array<React.ReactElement<any>>;
  style?: React.CSSProperties;
  theme: Theme;
}

export const ComponentsGroup = (props: ComponentsGroupProps): React.ReactElement<ComponentsGroupProps> => {
  const { title, components, style, theme } = props;
  return (
    <Gapped verticalAlign={'top'} gap={40}>
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
        <Gapped verticalAlign={'middle'} gap={10}>
          {components.map((element, index) => React.cloneElement(element, { key: index }))}
        </Gapped>
      </div>
    </Gapped>
  );
};
