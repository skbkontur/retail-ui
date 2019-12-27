import { ThemeType } from './constants';
import { ITheme, IThemeIn } from '../../../lib/theming/Theme';
import * as React from 'react';
import ThemeFactory from '../../../lib/theming/ThemeFactory';
import darkThemeVariables from './darkTheme';
import flatThemeVariables from '../../../lib/theming/themes/FlatTheme';
import ThemeProvider from '../ThemeProvider';
import { Playground } from './Playground';
import SidePage from '../../SidePage';
import jsStyles from './jsStyles';
import Gapped from '../../Gapped';
import ComboBox from '../../ComboBox';
import Link from '../../Link';
import styles from './styles.module.less';
import { ThemeEditor } from './ThemeEditor';
import ColorFunctions from '../../../lib/styles/ColorFunctions';

interface IState {
  editorOpened: boolean;
  editingThemeItem?: IEditingThemeItem;
  themes: IThemes;
  themesErrors: IThemesErrors;
  currentTheme: PlaygroundTheme;
  currentThemeType: ThemeType;
}
interface IThemes {
  default: ITheme;
  dark: ITheme;
  flat: ITheme;
}
interface IThemesErrors {
  default: ThemeErrorsType;
  dark: ThemeErrorsType;
  flat: ThemeErrorsType;
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
export type ThemeErrorsType = { [key in keyof PlaygroundTheme]?: boolean };

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
      themesErrors: {
        default: {},
        dark: {},
        flat: {},
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
    const { currentTheme, themesErrors, editingThemeItem, themes } = this.state;
    const themeErrors = themesErrors[editingThemeItem ? editingThemeItem.value : 'default'];
    return (
      <SidePage disableAnimations ignoreBackgroundClick blockBackground width={600} onClose={this.handleClose}>
        <SidePage.Header>
          <div className={jsStyles.editorHeaderWrapper(currentTheme)}>
            <Gapped wrap verticalAlign="middle">
              <span>Тема для редактирования:</span>
              <ComboBox
                getItems={this.getEditableThemesItems}
                value={editingThemeItem}
                onChange={this.handleEditingThemeSwitch}
              />
            </Gapped>
          </div>
          <div style={{ fontSize: 14, marginTop: 8 }}>
            <Link onClick={this.handelGetTheme}>Вывести тему в консоль</Link>
          </div>
        </SidePage.Header>
        <SidePage.Body>
          <div className={styles.sidePageBody}>
            <ThemeEditor
              editingTheme={themes[editingThemeItem!.value]}
              currentTheme={currentTheme}
              currentErrors={themeErrors}
              onValueChange={this.handleThemeVariableChange}
            />
          </div>
        </SidePage.Body>
      </SidePage>
    );
  };

  private handelGetTheme = () => {
    const currentTheme = this.state.currentTheme;
    const defaultTheme = ThemeFactory.getDefaultTheme();
    const themeObject: IThemeIn = {};
    ThemeFactory.getKeys(currentTheme).forEach(key => {
      const descriptor = Object.getOwnPropertyDescriptor(currentTheme, key);
      if (descriptor && !descriptor.get && defaultTheme[key] && currentTheme[key] !== defaultTheme[key]) {
        themeObject[key] = currentTheme[key];
      }
    });

    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(themeObject));
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
    const themeType = value as ThemeType;
    this.setState({
      currentThemeType: themeType,
      currentTheme: this.state.themes[themeType] as PlaygroundTheme,
    });
  };

  private handleThemeVariableChange = (variable: keyof PlaygroundTheme, value: string) => {
    const { editingThemeItem, currentTheme, themes, themesErrors } = this.state;
    const editingThemeType = editingThemeItem!.value;

    const theme = themes[editingThemeType];
    const currentValue = theme[variable];

    let canSetVariable = true;
    if (ColorFunctions.isValid(currentValue)) {
      canSetVariable = ColorFunctions.isValid(value);
      themesErrors[editingThemeType][variable] = !canSetVariable;
    }

    const nextThemeErrors: IThemesErrors = { ...themesErrors };
    nextThemeErrors[editingThemeType][variable] = !canSetVariable;
    const stateUpdate = { themes, currentTheme, themesErrors: nextThemeErrors };

    if (canSetVariable) {
      const result = this.changeThemeVariable(theme, variable, value);
      stateUpdate.themes[editingThemeType] = result;
      if (this.state.currentThemeType === editingThemeType) {
        stateUpdate.currentTheme = result as PlaygroundTheme;
      }
    }

    this.setState(stateUpdate);
  };

  private getEditableThemesItems = (query: string) => {
    return Promise.resolve(this.editableThemesItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase())));
  };

  private handleEditingThemeSwitch = (_: any, item: IEditingThemeItem) => {
    this.setState({ editingThemeItem: item });
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
