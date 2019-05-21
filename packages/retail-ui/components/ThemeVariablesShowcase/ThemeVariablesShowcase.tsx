import * as React from 'react';
import styles from './ThemeVariablesShowcase.less';
import defaultVariables from '../../lib/theming/themes/DefaultTheme';
import flatVariables from '../../lib/theming/themes/FlatTheme';
import { ITheme } from '../../lib/theming/Theme';
import ComboBox, { ComboBoxItem } from '../ComboBox';
import Gapped from '../Gapped';
import Link from '../Link';
import Sticky from '../Sticky';
import ColorFunctions from '../../lib/styles/ColorFunctions';
import Tooltip from '../Tooltip';
import { PopupPosition } from '../Popup';

interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}

interface ComponentRowDescriptionType {
  contents: string;
  variables: Array<keyof ITheme>;
}

interface ComponentDescriptionType {
  [elementName: string]: ComponentRowDescriptionType;
}

interface VariableNameToComponentsMap {
  [variableName: string]: DescriptionsType;
}

interface ThemeDescriptionType {
  [derivedVariableName: string]: string[];
}

const CSS_TOOLTIP_ALLOWED_POSITIONS: PopupPosition[] = ['bottom left', 'top left'];

const COMPONENT_DESCRIPTIONS: DescriptionsType = {};
const componentsContext = require.context('./ComponentDescriptions', false, /\.description\.ts$/);
componentsContext.keys().forEach(fileName => {
  COMPONENT_DESCRIPTIONS[fileName.replace('./', '').replace('.description.ts', '')] = componentsContext(
    fileName,
  ).default;
});

const DERIVATIONS_DESCRIPTIONS: ThemeDescriptionType = {};
const themesContext = require.context('./ThemeDescriptions', false, /\.description\.ts$/);
themesContext.keys().forEach(fileName => {
  const themeDescription = themesContext(fileName).default;
  Object.keys(themeDescription).forEach(key => {
    DERIVATIONS_DESCRIPTIONS[key] = (DERIVATIONS_DESCRIPTIONS[key] || []).concat(themeDescription[key]);
  });
});

const VARIABLE_TO_COMPONENTS_MAP: VariableNameToComponentsMap = {};
const USED_DERIVATIONS: string[] = [];
Object.keys(COMPONENT_DESCRIPTIONS).forEach(compName => {
  const elements = COMPONENT_DESCRIPTIONS[compName];
  Object.keys(elements).forEach(elName => {
    const variables = elements[elName].variables;
    variables.forEach(varName => {
      if (!VARIABLE_TO_COMPONENTS_MAP[varName]) {
        VARIABLE_TO_COMPONENTS_MAP[varName] = {};
      }

      if (!VARIABLE_TO_COMPONENTS_MAP[varName][compName]) {
        VARIABLE_TO_COMPONENTS_MAP[varName][compName] = {};
      }

      if (!VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName]) {
        VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName] = {
          contents: COMPONENT_DESCRIPTIONS[compName][elName].contents,
          variables: [varName],
        };
      } else if (!VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName].variables.includes(varName)) {
        VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName].variables.push(varName);
      }

      if (DERIVATIONS_DESCRIPTIONS[varName]) {
        DERIVATIONS_DESCRIPTIONS[varName].forEach(usedBaseVariable => {
          if (!USED_DERIVATIONS.includes(usedBaseVariable)) {
            USED_DERIVATIONS.push(usedBaseVariable);
          }
        });
      }
    });
  });
});

const USED_VARIABLES = Object.keys(VARIABLE_TO_COMPONENTS_MAP);

const ALL_VARIABLES = Object.keys(defaultVariables)
  .concat(Object.keys(flatVariables))
  .filter((variable, index, all) => all.indexOf(variable) === index);

interface ShowcaseProps {
  isDebugMode?: boolean;
}
interface ShowcaseState {
  selectedVariable?: ComboBoxItem;
}

export default class ThemeVariablesShowcase extends React.Component<ShowcaseProps, ShowcaseState> {
  public state: ShowcaseState = {};

  private isUnmounting = false;
  private variablesDiff: string[] = [];

  public componentWillMount(): void {
    if (this.props.isDebugMode) {
      ALL_VARIABLES.forEach(variable => {
        const found = USED_VARIABLES.includes(variable) || USED_DERIVATIONS.includes(variable);
        if (!found) {
          this.variablesDiff.push(variable);
        }
      });
    }
  }

  public render() {
    const selectedVariable = this.state.selectedVariable;
    const descriptionsToRender = selectedVariable
      ? VARIABLE_TO_COMPONENTS_MAP[selectedVariable.value] || {}
      : COMPONENT_DESCRIPTIONS;

    return (
      <Gapped vertical={false} gap={30} verticalAlign={'top'}>
        <div>
          <Sticky side={'top'}>
            <div className={styles.searchBar}>
              <Gapped vertical={false} gap={15}>
                <ComboBox
                  getItems={this.getItems}
                  value={selectedVariable}
                  onChange={this.handleVariableChange}
                  onUnexpectedInput={this.handleUnexpectedVariableInput}
                  placeholder={'поиск по названию переменной'}
                />
                {!!selectedVariable && <Link onClick={this.resetVariable}>сбросить</Link>}
              </Gapped>
            </div>
          </Sticky>
          {Object.keys(descriptionsToRender)
            .sort()
            .map(componentName => (
              <ComponentShowcase
                key={componentName}
                name={componentName}
                description={descriptionsToRender[componentName]}
                isDebugMode={this.props.isDebugMode}
                onVariableSelect={this.handleVariableChange}
              />
            ))}
        </div>
        <ShowUnusedVariables diff={this.variablesDiff} />
      </Gapped>
    );
  }
  public componentWillUnmount(): void {
    this.isUnmounting = true;
  }

  private getValues(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return USED_VARIABLES.filter(usedVariable => usedVariable.toLowerCase().startsWith(lowerCaseQuery)).map(
      usedVariableName => ({
        value: usedVariableName,
        label: usedVariableName,
      }),
    );
  }
  private getItems = (query: string) => {
    return Promise.resolve(this.getValues(query));
  };
  private handleVariableChange = (event: any, item: ComboBoxItem) => {
    if (!this.isUnmounting) {
      this.setState({ selectedVariable: item });
    }
  };
  private handleUnexpectedVariableInput = (query: string) => {
    const values = this.getValues(query);
    if (values.length > 0) {
      return values[0];
    } else {
      return this.resetVariable();
    }
  };
  private resetVariable = () => {
    if (!this.isUnmounting) {
      this.setState({ selectedVariable: undefined });
    }
  };
}

interface ComponentShowcaseProps {
  name: string;
  description: ComponentDescriptionType;
  isDebugMode?: boolean;
  onVariableSelect: (event: any, item: ComboBoxItem) => void;
}
class ComponentShowcase extends React.Component<ComponentShowcaseProps, {}> {
  public render() {
    const { name, description, onVariableSelect, isDebugMode } = this.props;
    const elements = Object.keys(description);

    return (
      <React.Fragment>
        <Sticky side={'top'} offset={parseInt(styles.searchBarHeight, 10)}>
          {isSticky => <h2 className={`${styles.heading} ${isSticky && styles.headingSticky}`}>{this.props.name}</h2>}
        </Sticky>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 200 }}>ClassName</th>
              <th style={{ width: 220 }}>Variable Name</th>
              <th style={{ width: 250 }}>Default Value</th>
              <th style={{ width: 250 }}>Flat Value</th>
            </tr>
          </thead>
          <tbody>
            {elements.map(el => (
              <ComponentShowcaseRow
                key={`${name}_${el}`}
                element={el}
                row={description[el]}
                onVariableSelect={onVariableSelect}
                isDebugMode={isDebugMode}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

interface ComponentShowcaseRowProps {
  element: string;
  row: ComponentRowDescriptionType;
  isDebugMode?: boolean;
  onVariableSelect: (event: any, item: ComboBoxItem) => void;
}

class ComponentShowcaseRow extends React.Component<ComponentShowcaseRowProps> {
  public render() {
    const { element: el, row, isDebugMode } = this.props;
    const rowSpan = row.variables.length + 1;

    return (
      <React.Fragment>
        <tr className={styles.invisibleRow}>
          <td rowSpan={rowSpan}>
            <Tooltip
              render={this.getCss}
              pos={'bottom left'}
              allowedPositions={CSS_TOOLTIP_ALLOWED_POSITIONS}
              trigger={'click'}
              useWrapper={false}
            >
              <span className={styles.elementName}>.{el}</span>
            </Tooltip>
          </td>
          <td className={styles.invisibleCell} />
          <td className={styles.invisibleCell} />
          <td className={styles.invisibleCell} />
        </tr>
        {row.variables.map(varName => {
          const variableDefault = (defaultVariables as ITheme)[varName];
          const variableFlat = (flatVariables as ITheme)[varName];
          const hasNoVariables = isDebugMode && !variableDefault && !variableFlat;
          const hasOnlyDefaultVariable = isDebugMode && variableDefault && !variableFlat;

          return (
            <tr key={`${el}_${varName}`} className={hasNoVariables ? styles.suspiciousRow : undefined}>
              <td className={hasOnlyDefaultVariable ? styles.suspiciousCell : undefined}>
                <VariableName variableName={varName as string} onVariableSelect={this.props.onVariableSelect} />
              </td>
              <td>
                <VariableValue value={variableDefault} />
              </td>
              <td>
                <VariableValue value={variableFlat} />
              </td>
            </tr>
          );
        })}
      </React.Fragment>
    );
  }

  private getCss = () => {
    return <span className={styles.relativeCss}>{this.props.row.contents}</span>;
  };
}

interface VariableNameProps {
  variableName: string;
  onVariableSelect: (event: any, item: ComboBoxItem) => void;
}

class VariableName extends React.Component<VariableNameProps> {
  public render() {
    return (
      <span className={styles.variableName} onClick={this.handleVariableSelect}>
        {this.props.variableName}
      </span>
    );
  }
  private handleVariableSelect = () => {
    const { variableName, onVariableSelect } = this.props;
    if (onVariableSelect) {
      onVariableSelect(event, { value: variableName, label: variableName });
    }
  };
}

const VariableValue = (props: { value: string }) => {
  const value = props.value;
  const valueIsColor = isColor(value);
  const valueIsGradient = isGradient(value);
  const hasExample = valueIsColor || valueIsGradient;
  let borderColor = 'transparent';
  if (hasExample) {
    borderColor = valueIsColor ? ColorFunctions.contrast(value) : '#000';
  }

  return (
    <span className={!value ? styles.undefined : undefined}>
      {hasExample && <span className={styles.colorExample} style={{ background: value, borderColor }} />}
      {value || 'undefined'}
    </span>
  );
};

const ShowUnusedVariables = (props: { diff: string[] }) => {
  if (props.diff.length === 0) {
    return null;
  }

  return (
    <div className={styles.unusedVariablesWarning}>
      Неиспользованные переменные ({props.diff.length}
      ):
      <ul>
        {props.diff.sort().map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

function isColor(input: string) {
  return !!input && (input.startsWith('#') || input.startsWith('rgb') || input.startsWith('hsl'));
}

function isGradient(input: string) {
  return !!input && input.startsWith('linear-gradient');
}
