import * as React from 'react';
import { css } from 'emotion';
import { storiesOf } from '@storybook/react';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { ITheme } from '../../../lib/theming/Theme';
import ThemeProvider from '../ThemeProvider';
import SidePage from '../../SidePage';
import ComboBox from '../../ComboBox';
import { Playground } from '../Playground/Playground';
import { ThemeType } from '../Playground/constants';
import Gapped from '../../Gapped';
import flatThemeVariables from '../../../lib/theming/themes/FlatTheme';
import darkThemeVariables from '../Playground/darkTheme';
import styles from '../Playground/styles.less';
import { ThemeEditor } from '../Playground/ThemeEditor';

interface IState {
  currentTheme: PlaygroundTheme;
  currentThemeType: ThemeType;
  editorOpened: boolean;
  editingThemeItem?: IEditingThemeItem;
  themes: IThemes;
}
interface IThemes {
  default: ITheme;
  dark: ITheme;
  flat: ITheme;
}
interface IEditingThemeItem {
  value: ThemeType;
  label: string;
}
interface IProps {}

interface IThemeExtension {
  backgroundMain: string;
  textColorMain: string;
}
export type PlaygroundTheme = ITheme & IThemeExtension;

export class ThemeProviderPlayground extends React.Component<IProps, IState> {
  private readonly editableThemesItems = [
    { value: ThemeType.Default, label: 'Дефолтная' },
    { value: ThemeType.Flat, label: 'Плоская' },
    { value: ThemeType.Dark, label: 'Темная' },
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentTheme: ThemeFactory.getDefaultTheme() as PlaygroundTheme,
      currentThemeType: ThemeType.Default,
      editorOpened: false,
      themes: {
        default: ThemeFactory.getDefaultTheme(),
        dark: ThemeFactory.create(darkThemeVariables),
        flat: ThemeFactory.create(flatThemeVariables),
      },
    };
  }

  public render() {
    const { currentTheme, editorOpened, currentThemeType } = this.state;
    return (
      <ThemeProvider value={currentTheme}>
        {editorOpened && this.renderSidePage()}
        {
          <Playground
            onThemeChange={this.handleThemeChange}
            currentThemeType={currentThemeType}
            onEditLinkClick={this.handleOpen}
          />
        }
      </ThemeProvider>
    );
  }

  private renderSidePage = () => {
    const { currentTheme, editingThemeItem, themes } = this.state;
    return (
      <SidePage disableAnimations ignoreBackgroundClick blockBackground width={600} onClose={this.handleClose}>
        <SidePage.Header>
          <div
            className={css`
              color: ${currentTheme.textColorMain};
            `}
          >
            <Gapped>
              <span>Тема для редактирования:</span>
              <ComboBox
                getItems={this.getEditableThemesItems}
                value={editingThemeItem}
                onChange={this.handleEditingThemeSwitch}
              />
            </Gapped>
          </div>
        </SidePage.Header>
        <SidePage.Body>
          <div className={styles.sidePageBody}>
            <ThemeEditor
              editingTheme={themes[editingThemeItem!.value]}
              currentTheme={currentTheme}
              onValueChange={this.handleThemeVariableChange}
            />
          </div>
        </SidePage.Body>
      </SidePage>
    );
  };

  private handleOpen = () => {
    this.setState(state => ({
      editorOpened: true,
      editingThemeItem: this.editableThemesItems.find(i => i.value === state.currentThemeType),
    }));
  };

  private handleClose = () => {
    this.setState({
      editorOpened: false,
    });
  };

  private handleThemeChange = (ev: { target: { value: string } }, value: string) => {
    this.setState({
      currentThemeType: value as ThemeType,
      currentTheme: this.getThemeByType(value as ThemeType) as PlaygroundTheme,
    });
  };

  private getThemeByType = (themeType: ThemeType): ITheme => {
    return this.state.themes[themeType];
  };

  private handleThemeVariableChange = (variable: keyof PlaygroundTheme, value: string) => {
    const { editingThemeItem, currentTheme, themes } = this.state;
    const editingThemeType = editingThemeItem!.value;
    const result = this.changeThemeVariable(themes[editingThemeType], variable, value);

    const stateUpdate = {
      themes,
      currentTheme,
    };
    stateUpdate.themes[editingThemeType] = result;
    if (this.state.currentThemeType === editingThemeType) {
      stateUpdate.currentTheme = result as PlaygroundTheme;
    }

    this.setState(stateUpdate);
  };

  private getEditableThemesItems = (query: string) => {
    return Promise.resolve(this.editableThemesItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase())));
  };

  private handleEditingThemeSwitch = (_: any, item: IEditingThemeItem) => {
    this.setState({
      editingThemeItem: item,
    });
  };

  private changeThemeVariable = (theme: ITheme, variableName: keyof ITheme, variableValue: string): ITheme => {
    const result = {} as PlaygroundTheme;
    ThemeFactory.getKeys(theme).forEach(key => {
      const descriptor = findPropertyDescriptor(theme, key);
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if (key === variableName) {
        delete descriptor.get;
        delete descriptor.set;
        descriptor.value = variableValue;
      }
      Object.defineProperty(result, key, descriptor);
    });

    return Object.freeze(result);
  };
}

function findPropertyDescriptor(theme: ITheme, propName: keyof ITheme) {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (theme.hasOwnProperty(propName)) {
      return Object.getOwnPropertyDescriptor(theme, propName) || {};
    }
  }
  return {};
}

storiesOf('ThemeProvider', module).add('playground', () => <ThemeProviderPlayground />);
