import * as React from 'react';
import { css } from 'emotion';
import { storiesOf } from '@storybook/react';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { ITheme } from '../../../lib/theming/Theme';
import ThemeProvider from '../ThemeProvider';
import SidePage from '../../SidePage';
import { VariableValue } from './VariableValue';
import { Playground } from './Playground';
import { ThemeType } from './enums';
import Gapped from '../../Gapped';
import flatThemeVariables from '../../../lib/theming/themes/FlatTheme';
import darkThemeVariables from './darkTheme';
import styles from './styles.less';

interface IState {
  theme: PlaygroundTheme;
  opened: boolean;
  activeThemeType: ThemeType;
}

interface IProps {}

interface IThemeExtension {
  backgroundMain: string;
  textColorMain: string;
}
export type PlaygroundTheme = ITheme & IThemeExtension;

export class ThemeProviderShowcase extends React.Component<IProps, IState> {
  private readonly defaultTheme = ThemeFactory.getDefaultTheme();
  private readonly flatTheme = ThemeFactory.create(flatThemeVariables);
  private customTheme = ThemeFactory.create({});
  private readonly darkTheme = ThemeFactory.create(darkThemeVariables);

  constructor(props: IProps) {
    super(props);
    this.state = {
      theme: this.defaultTheme as PlaygroundTheme,
      opened: false,
      activeThemeType: ThemeType.Default,
    };
  }

  public render() {
    const { theme, opened, activeThemeType } = this.state;
    return (
      <ThemeProvider value={theme}>
        {opened && this.renderSidePage()}
        {
          <Playground
            onThemeChange={this.handleThemeChange}
            activeThemeType={activeThemeType}
            onEditLinkClick={this.handleOpen}
          />
        }
      </ThemeProvider>
    );
  }

  private renderSidePage = () => {
    return (
      <SidePage disableAnimations ignoreBackgroundClick blockBackground width={750} onClose={this.handleClose}>
        <SidePage.Header>
          <div
            className={css`
              color: ${this.state.theme.textColorMain};
            `}
          >
            Своя тема
          </div>
        </SidePage.Header>
        <SidePage.Body>
          <div className={styles.sidePageBody}>
            <Gapped verticalAlign={'middle'} gap={10}>
              {ThemeFactory.getKeys(this.customTheme).map(key => {
                return (
                  <VariableValue
                    theme={this.state.theme}
                    onChange={this.handleCustomThemeVariableChange}
                    value={this.customTheme[key as keyof ITheme]}
                    variable={key}
                    key={key}
                  />
                );
              })}
            </Gapped>
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
      case ThemeType.Dark:
        theme = this.darkTheme;
        break;
      default:
        theme = this.defaultTheme;
    }

    this.setState({
      theme: theme as PlaygroundTheme,
    });
  };

  private handleCustomThemeVariableChange = (variable: string, value: string) => {
    this.customTheme = ThemeFactory.create({ ...this.customTheme, [variable]: value });
    if (this.state.activeThemeType === ThemeType.Custom) {
      this.setState({
        theme: this.customTheme as PlaygroundTheme,
      });
    }
  };
}

storiesOf('ThemeProvider', module).add('playground', () => <ThemeProviderShowcase />);
