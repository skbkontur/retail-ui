import React, { ReactNode } from 'react';

import { Theme, ThemeIn } from '../../../lib/theming/Theme';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { FLAT_THEME as flatThemeVariables } from '../../../lib/theming/themes/FlatTheme';
import { ThemeProvider } from '../ThemeProvider';
import { SidePage } from '../../SidePage';
import { Gapped } from '../../Gapped';
import { ComboBox } from '../../ComboBox';
import { Link } from '../../Link';
import * as ColorFunctions from '../../../lib/styles/ColorFunctions';

import styles from './styles.module.less';
import { ThemeEditor } from './ThemeEditor';
import { jsStyles } from './jsStyles';
import { Playground } from './Playground';
import { darkTheme as darkThemeVariables } from './darkTheme';
import { ThemeType } from './constants';

interface PlaygroundState {
  editorOpened: boolean;
  editingThemeItem?: EditingThemeItem;
  themes: Themes;
  themesErrors: ThemesErrors;
  currentTheme: PlaygroundTheme;
  currentThemeType: ThemeType;
}
interface Themes {
  default: Theme;
  dark: Theme;
  flat: Theme;
}
interface ThemesErrors {
  default: ThemeErrorsType;
  dark: ThemeErrorsType;
  flat: ThemeErrorsType;
}
interface EditingThemeItem {
  value: ThemeType;
  label: string;
}
interface PlaygroundProps {
  children?: ReactNode;
}

interface ThemeExtension {
  backgroundMain: string;
  textColorMain: string;
}
export type PlaygroundTheme = Theme & ThemeExtension;
export type ThemeErrorsType = { [key in keyof PlaygroundTheme]?: boolean };

export class ThemeProviderPlayground extends React.Component<PlaygroundProps, PlaygroundState> {
  private readonly editableThemesItems = [
    { value: ThemeType.Default, label: 'Дефолтная' },
    { value: ThemeType.Flat, label: 'Плоская' },
    { value: ThemeType.Dark, label: 'Темная' },
  ];

  constructor(props: PlaygroundProps) {
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
                onValueChange={this.handleEditingThemeSwitch}
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
    const themeObject: ThemeIn = {};
    ThemeFactory.getKeys(currentTheme).forEach(key => {
      const descriptor = Object.getOwnPropertyDescriptor(currentTheme, key);
      if (descriptor && !descriptor.get && defaultTheme[key] && currentTheme[key] !== defaultTheme[key]) {
        themeObject[key] = currentTheme[key];
      }
    });

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

  private handleThemeChange = (value: string) => {
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

    const nextThemeErrors: ThemesErrors = { ...themesErrors };
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

  private handleEditingThemeSwitch = (item: EditingThemeItem) => {
    this.setState({ editingThemeItem: item });
  };

  private changeThemeVariable = (theme: Theme, variableName: keyof Theme, variableValue: string): Theme => {
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

function findPropertyDescriptor(theme: Theme, propName: keyof Theme) {
  for (; theme != null; theme = Object.getPrototypeOf(theme)) {
    if (theme.hasOwnProperty(propName)) {
      return Object.getOwnPropertyDescriptor(theme, propName) || {};
    }
  }
  return {};
}
