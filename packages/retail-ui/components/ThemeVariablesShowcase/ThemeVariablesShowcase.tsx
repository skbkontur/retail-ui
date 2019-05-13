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
import * as VariablesDescriptions from './VariablesDescription';

interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}
interface ComponentDescriptionType {
  [elementName: string]: {
    contents: string;
    variables: Array<keyof ITheme>;
  };
}

interface VariableNameToComponentsMap {
  [variableName: string]: DescriptionsType;
}

const DESCRIPTIONS: DescriptionsType = VariablesDescriptions as DescriptionsType;
const VARIABLE_TO_COMPONENTS_MAP: VariableNameToComponentsMap = {};
Object.keys(DESCRIPTIONS).forEach(compName => {
  const elements = DESCRIPTIONS[compName];
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
          contents: DESCRIPTIONS[compName][elName].contents,
          variables: [varName],
        };
      } else if (!VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName].variables.includes(varName)) {
        VARIABLE_TO_COMPONENTS_MAP[varName][compName][elName].variables.push(varName);
      }
    });
  });
});

const USED_VARIABLES = Object.keys(VARIABLE_TO_COMPONENTS_MAP).sort();
const ALL_VARIABLES = Array.from(new Set(Object.keys(defaultVariables).concat(Object.keys(flatVariables)))).sort();

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
    const hasUnusedVariables = this.props.isDebugMode && USED_VARIABLES.length !== ALL_VARIABLES.length;

    if (hasUnusedVariables) {
      let offset = 0;
      USED_VARIABLES.forEach((v, i) => {
        if (v !== ALL_VARIABLES[i + offset]) {
          while (ALL_VARIABLES[i + offset] && v !== ALL_VARIABLES[i + offset]) {
            this.variablesDiff.push(ALL_VARIABLES[i + offset]);
            offset++;
          }
        }
      });
    }
  }

  public render() {
    const selectedVariable = this.state.selectedVariable;
    const descriptionsToRender = selectedVariable
      ? VARIABLE_TO_COMPONENTS_MAP[selectedVariable.value] || {}
      : DESCRIPTIONS;

    return (
      <React.Fragment>
        <ShowUnusedVariables diff={this.variablesDiff} />
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
      </React.Fragment>
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
    const { description, isDebugMode } = this.props;
    const elements = Object.keys(description);

    return (
      <React.Fragment>
        <Sticky side={'top'} offset={parseInt(styles.searchBarHeight, 10)}>
          {isSticky => <h2 className={`${styles.heading} ${isSticky && styles.headingSticky}`}>{this.props.name}</h2>}
        </Sticky>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 120 }}>ClassName</th>
              <th>Styles</th>
              <th style={{ width: 220 }}>Variable name</th>
              <th style={{ width: 200 }}>Default value</th>
              <th style={{ width: 200 }}>Flat value</th>
            </tr>
          </thead>
          <tbody>
            {elements.map(el => {
              const row = description[el];
              const rowSpan = row.variables.length + 1;
              return (
                <React.Fragment key={`${this.props.name}_${el}`}>
                  <tr className={styles.invisibleRow}>
                    <td rowSpan={rowSpan} className={styles.className}>
                      .{el}
                    </td>
                    <td rowSpan={rowSpan} className={styles.relativeCss}>
                      {row.contents}
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
                      <tr
                        key={`${this.props.name}_${el}_${varName}`}
                        className={hasNoVariables ? styles.suspiciousRow : undefined}
                      >
                        <td className={hasOnlyDefaultVariable ? styles.suspiciousCell : undefined}>
                          <VariableName
                            variableName={varName as string}
                            onVariableSelect={this.props.onVariableSelect}
                          />
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
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
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
      Неиспользованные переменные:
      <ul>
        {props.diff.map(v => (
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
