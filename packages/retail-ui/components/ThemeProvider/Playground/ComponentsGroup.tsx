import React from 'react';
import {css, cx} from "emotion";
import styles from "./styles.less";
import Gapped from "../../Gapped";
import {ITheme} from "../../../lib/theming/Theme";

interface IComponentsGroupProps {
  title: string;
  components: Array<React.ReactElement<any>>;
  style?: React.CSSProperties;
  theme: ITheme;
}

export const ComponentsGroup = (props: IComponentsGroupProps): React.ReactElement<IComponentsGroupProps> => {
  const {title, components, style, theme} = props;
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
    )
};
