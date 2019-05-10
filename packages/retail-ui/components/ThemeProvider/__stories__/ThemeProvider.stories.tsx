import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { ITheme } from '../../../lib/theming/Theme';
import SidePage from '../../SidePage';
import { VariableValue } from './VariableValue';
import { Playground } from './Playground';
import { ThemeType } from './enums';

interface IState {
  theme: ITheme;
  opened: boolean;
  activeThemeId: ThemeType;
}

interface IProps {

}

class ThemeProviderStory extends React.Component<IProps, IState> {
  private customTheme: ITheme;
  private readonly defaultTheme = ThemeFactory.getDefaultTheme();
  private readonly flatTheme = ThemeFactory.getFlatTheme();

  constructor(props: IProps) {
    super(props);
    this.customTheme = this.defaultTheme;
  }

  public state = {
    theme: this.defaultTheme,
    opened: false,
    activeThemeId: ThemeType.Default,
  };

  public render() {
    const { theme, opened, activeThemeId } = this.state;
    return (
      <div>
        {opened && this.renderSidePage()}
        {<Playground
          theme={theme}
          onThemeChange={this.handleThemeChange}
          activeThemeId={activeThemeId}
          onEditLinkClick={this.handleOpen}
        />}
      </div>
    );
  }

  private renderSidePage = () => {
    const { theme } = this.state;

    return (
      <SidePage
        disableAnimations
        ignoreBackgroundClick
        blockBackground
        width={500}
        onClose={this.handleClose}
      >
        <SidePage.Header>Theme</SidePage.Header>
        <SidePage.Body>
          <div>
            {Object.keys(this.defaultTheme).map(key => {
              return (
                <VariableValue
                  onChange={this.handleCustomThemeVariableChange}
                  value={(theme as any)[key]}
                  variable={key}
                  key={key}
                />
              );
            })}
          </div>
        </SidePage.Body>
      </SidePage>
    );
  };

  private handleOpen = () => {
    this.setState({
      opened: true,
    });
  };

  private handleClose = () => {
    this.setState({
      opened: false,
    });
  };

  private handleThemeChange = (ev: { target: { value: string; }; }, value: string) => {
    this.setState({
      activeThemeId: value as ThemeType,
    });
    this.changeTheme(value as ThemeType);
  };

  private changeTheme = (themeId: ThemeType) => {
    let theme: ITheme;
    switch (themeId) {
      case ThemeType.Default:
        theme = this.defaultTheme;
        break;
      case ThemeType.Flat:
        theme = this.flatTheme;
        break;
      case ThemeType.Custom:
        theme = this.customTheme;
        break;
      default:
        theme = this.defaultTheme;
    }

    this.setState({
      theme,
    });
  };

  private handleCustomThemeVariableChange = (variable: string, value: string) => {
    this.customTheme = Object.assign({}, this.customTheme, { [variable]: value });
    this.setState({
      theme: this.customTheme,
    });
  };
}

storiesOf('ThemeProvider', module).add('playground', () => <ThemeProviderStory/>);
