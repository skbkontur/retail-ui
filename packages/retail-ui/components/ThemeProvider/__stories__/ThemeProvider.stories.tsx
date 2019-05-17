import * as React from 'react';
import { css } from 'emotion';
import { storiesOf } from '@storybook/react';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import { ITheme } from '../../../lib/theming/Theme';
import ThemeProvider from '../ThemeProvider';
import SidePage from '../../SidePage';
import ComboBox from '../../ComboBox';
import { Playground } from '../Playground/Playground';
import { ThemeType } from '../Playground/enums';
import Gapped from '../../Gapped';
import flatThemeVariables from '../../../lib/theming/themes/FlatTheme';
import darkThemeVariables from '../Playground/darkTheme';
import styles from '../Playground/styles.less';
import { EditingVariables } from '../Playground/EditingVariables';

interface IState {
  currentTheme: PlaygroundTheme;
  currentThemeType: ThemeType;
  editorOpened: boolean;
  editingTheme: ITheme;
  editingThemeItem: IEditingThemeItem;
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
  private defaultTheme = ThemeFactory.getDefaultTheme();
  private flatTheme = ThemeFactory.create(flatThemeVariables);
  private darkTheme = ThemeFactory.create(darkThemeVariables);
  private customTheme = ThemeFactory.create({});
  private readonly editableThemesItems = [
    { value: ThemeType.Default, label: 'Дефолтная' },
    { value: ThemeType.Flat, label: 'Плоская' },
    { value: ThemeType.Dark, label: 'Темная' },
    { value: ThemeType.Custom, label: 'Своя' },
  ];

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentTheme: this.defaultTheme as PlaygroundTheme,
      editorOpened: false,
      currentThemeType: ThemeType.Default,
      editingTheme: this.defaultTheme,
      editingThemeItem: {
        value: ThemeType.Default,
        label: 'Дефолтная',
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
    const { currentTheme, editingThemeItem, editingTheme } = this.state;
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
                onChange={this.handleSelectedThemeToEditChange}
              />
            </Gapped>
          </div>
        </SidePage.Header>
        <SidePage.Body>
          <div className={styles.sidePageBody}>
            <EditingVariables
              editingTheme={editingTheme}
              currentTheme={currentTheme}
              onValueChange={this.handleThemeVariableChange}
            />
          </div>
        </SidePage.Body>
      </SidePage>
    );
  };

  private handleOpen = () => {
    this.setState({
      editorOpened: true,
    });
  };

  private handleClose = () => {
    this.setState({
      editorOpened: false,
    });
  };

  private handleThemeChange = (ev: { target: { value: string } }, value: string) => {
    this.setState({
      currentThemeType: value as ThemeType,
    });
    this.changeTheme(value as ThemeType);
  };

  private changeTheme = (themeType: ThemeType) => {
    this.setState({
      currentTheme: this.getThemeByType(themeType) as PlaygroundTheme,
    });
  };

  private getThemeByType = (themeType: ThemeType): ITheme => {
    switch (themeType) {
      case ThemeType.Default:
        return this.defaultTheme;
      case ThemeType.Flat:
        return this.flatTheme;
      case ThemeType.Custom:
        return this.customTheme;
      case ThemeType.Dark:
        return this.darkTheme;
    }
  };

  private handleThemeVariableChange = (variable: keyof PlaygroundTheme, value: string) => {
    const { editingTheme, editingThemeItem, currentTheme } = this.state;
    const editingThemeType = editingThemeItem.value;
    const result = this.changeThemeVariable(editingTheme, variable, value);

    switch (editingThemeType) {
      case ThemeType.Default:
        this.defaultTheme = result;
        break;
      case ThemeType.Flat:
        this.flatTheme = result;
        break;
      case ThemeType.Custom:
        this.customTheme = result;
        break;
      case ThemeType.Dark:
        this.darkTheme = result;
        break;
    }
    const stateUpdate = {
      editingTheme: result,
      currentTheme,
    };

    if (this.state.currentThemeType === editingThemeType) {
      stateUpdate.currentTheme = result as PlaygroundTheme;
    }
    this.setState(stateUpdate);
  };

  private getEditableThemesItems = (query: string) => {
    return Promise.resolve(this.editableThemesItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase())));
  };

  private handleSelectedThemeToEditChange = (_: any, item: IEditingThemeItem) => {
    this.setState({
      editingThemeItem: item,
      editingTheme: this.getThemeByType(item.value),
    });
  };

  private changeThemeVariable = (theme: ITheme, variableName: keyof ITheme, variableValue: string): ITheme => {
    const result = {} as PlaygroundTheme;
    ThemeFactory.getKeys(theme).forEach(key => {
      const descriptor = findPropretyDescriptor(theme, key);
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if (key === variableName) {
        delete descriptor.get;
        delete descriptor.set;
        descriptor.value = variableValue;
      }
      Object.defineProperty(result, key, descriptor);
    });

    return result;
  };
}

function findPropretyDescriptor(theme: ITheme, propName: keyof ITheme) {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (theme.hasOwnProperty(propName)) {
      return Object.getOwnPropertyDescriptor(theme, propName) || {};
    }
  }
  return {};
}

storiesOf('ThemeProvider', module).add('playground', () => <ThemeProviderPlayground />);
