import React, { ReactNode } from 'react';
import warning from 'warning';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';

interface ThemeConsumerProps {
  children: (theme: Theme) => ReactNode;
}

export class ThemeConsumer extends React.Component<ThemeConsumerProps> {
  componentDidMount(): void {
    warning(true, "ThemeConsumer was deprecated please use 'ThemeContext' instead. \nSee https://tech.skbkontur.ru/react-ui/#/Customization/ThemeContext");
  }
  render() {
    return <ThemeContext.Consumer>{this.props.children}</ThemeContext.Consumer>
  }
}
