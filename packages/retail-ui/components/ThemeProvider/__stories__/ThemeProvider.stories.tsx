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
  activeThemeType: ThemeType;
}

interface IProps {}

class ThemeProviderStory extends React.Component<IProps, IState> {
  private customTheme: ITheme;
  private readonly defaultTheme = ThemeFactory.getDefaultTheme();
  private readonly flatTheme = ThemeFactory.getFlatTheme();

  constructor(props: IProps) {
    super(props);
    this.customTheme = this.defaultTheme;
    this.state = {
      theme: this.defaultTheme,
      opened: false,
      activeThemeType: ThemeType.Default,
    };
  }

  public render() {
    const { theme, opened, activeThemeType } = this.state;
    return (
      <div>
        {opened && this.renderSidePage()}
        {
          <Playground
            theme={theme}
            onThemeChange={this.handleThemeChange}
            activeThemeType={activeThemeType}
            onEditLinkClick={this.handleOpen}
          />
        }
      </div>
    );
  }

  private renderSidePage = () => {
    return (
      <SidePage disableAnimations ignoreBackgroundClick blockBackground width={750} onClose={this.handleClose}>
        <SidePage.Header>Своя тема</SidePage.Header>
        <SidePage.Body>
          <div>
            {Object.keys(this.customTheme).map(key => {
              return (
                <VariableValue
                  onChange={this.handleCustomThemeVariableChange}
                  value={this.customTheme[key]}
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

  private handleThemeChange = (ev: { target: { value: string } }, value: string) => {
    this.setState({
      activeThemeType: value as ThemeType,
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
    if (this.state.activeThemeType === ThemeType.Custom) {
      this.setState({
        theme: this.customTheme,
      });
    }
  };
}

storiesOf('ThemeProvider', module).add('playground', () => <ThemeProviderStory />);
