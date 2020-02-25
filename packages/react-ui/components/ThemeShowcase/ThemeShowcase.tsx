import React from 'react';
import cn from 'classnames';

import { DEFAULT_THEME as defaultVariables } from '../../lib/theming/themes/DefaultTheme';
import { FLAT_THEME as flatVariables } from '../../lib/theming/themes/FlatTheme';
import { ComboBox, ComboBoxItem } from '../ComboBox';
import { Gapped } from '../Gapped';
import { Link } from '../Link';
import { Sticky } from '../Sticky';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Tooltip } from '../Tooltip';
import { PopupPosition } from '../Popup';
import { IS_PROXY_SUPPORTED } from '../internal/Supports';

import {
  ALL_USED_VARIABLES,
  CALLS_COUNT,
  COMPONENT_DESCRIPTIONS,
  COMPONENT_DESCRIPTIONS_BY_VARIABLE,
  ComponentDescriptionType,
  ComponentRowDescriptionType,
  EXECUTION_TIME,
} from './ThemeShowcaseHelpers/VariablesCollector';
import { jsStyles } from './ThemeShowcase.styles';

const CSS_TOOLTIP_ALLOWED_POSITIONS: PopupPosition[] = ['bottom left', 'top left'];
const EMPTY_ARRAY: string[] = [];

const ALL_VARIABLES = Object.keys(defaultVariables)
  .concat(Object.keys(flatVariables))
  .filter((variable, index, all) => all.indexOf(variable) === index);

interface ShowcaseProps {
  isDebugMode?: boolean;
}
interface ShowcaseState {
  selectedVariable?: ComboBoxItem;
}

export class ThemeShowcase extends React.Component<ShowcaseProps, ShowcaseState> {
  public state: ShowcaseState = {};

  private isUnmounting = false;
  private variablesDiff: string[] = [];

  public UNSAFE_componentWillMount(): void {
    if (this.props.isDebugMode) {
      ALL_VARIABLES.forEach(variable => {
        const found = ALL_USED_VARIABLES.includes(variable);
        if (!found) {
          this.variablesDiff.push(variable);
        }
      });
    }
  }

  public render() {
    if (!IS_PROXY_SUPPORTED) {
      return (
        <div>
          Таблица использования переменных доступна только в{' '}
          <Link href={'https://caniuse.com/#feat=proxy'} target={'_blank'}>
            браузерах с поддержкой Proxy
          </Link>
          .
        </div>
      );
    }

    const selectedVariable = this.state.selectedVariable;
    const descriptionsToRender = selectedVariable
      ? COMPONENT_DESCRIPTIONS_BY_VARIABLE[selectedVariable.value] || {}
      : COMPONENT_DESCRIPTIONS;

    const isDebugMode = this.props.isDebugMode;
    const callsCount = isDebugMode ? `(${CALLS_COUNT} вызовов)` : '';
    const executionTime = isDebugMode ? `Сгенерировано за ${EXECUTION_TIME.toFixed(3)}ms` : '';

    return (
      <Gapped wrap gap={30} verticalAlign={'top'}>
        <div>
          <Sticky side={'top'}>
            <div className={jsStyles.searchBar()} data-perf-info={`${executionTime} ${callsCount}`}>
              <Gapped gap={15}>
                <ComboBox
                  getItems={this.getItems}
                  value={selectedVariable}
                  onValueChange={this.handleVariableChange}
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
                isDebugMode={isDebugMode}
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
    const lowerCaseQuery = query && query.toLowerCase().trim();
    let allItems = ALL_USED_VARIABLES;
    if (lowerCaseQuery) {
      allItems = ALL_USED_VARIABLES.filter(usedVariable => usedVariable.toLowerCase().startsWith(lowerCaseQuery));
    }
    return allItems.map(usedVariableName => ({
      value: usedVariableName,
      label: usedVariableName,
    }));
  }
  private getItems = (query: string) => {
    return Promise.resolve(this.getValues(query));
  };
  private handleVariableChange = (item: ComboBoxItem) => {
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
  onVariableSelect: (item: ComboBoxItem) => void;
}
class ComponentShowcase extends React.Component<ComponentShowcaseProps, {}> {
  public render() {
    const { name, description, onVariableSelect, isDebugMode } = this.props;
    const elements = Object.keys(description);

    return (
      <React.Fragment>
        <Sticky side={'top'} offset={40}>
          {isSticky => (
            <h2
              className={cn({
                [jsStyles.heading()]: true,
                [jsStyles.headingSticky()]: isSticky,
              })}
            >
              {this.props.name}
            </h2>
          )}
        </Sticky>
        <table className={jsStyles.table()}>
          <thead>
            <tr>
              <th style={{ width: 170 }}>ClassName</th>
              <th style={{ width: 210 }}>Variable Name</th>
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
  onVariableSelect: (item: ComboBoxItem) => void;
}

class ComponentShowcaseRow extends React.Component<ComponentShowcaseRowProps> {
  public render() {
    const { element: el, row, isDebugMode } = this.props;
    const rowSpan = row.variables.length + 1;

    return (
      <React.Fragment>
        <tr className={jsStyles.invisibleRow()}>
          <td rowSpan={rowSpan}>
            <Tooltip
              render={this.getCss}
              pos={'bottom left'}
              allowedPositions={CSS_TOOLTIP_ALLOWED_POSITIONS}
              trigger={'click'}
              useWrapper={false}
            >
              <span className={jsStyles.elementName()}>.{el}</span>
            </Tooltip>
          </td>
          <td className={jsStyles.invisibleCell()} />
          <td className={jsStyles.invisibleCell()} />
          <td className={jsStyles.invisibleCell()} />
        </tr>
        {row.variables.map(varName => {
          const dependencies = row.dependencies[varName] || EMPTY_ARRAY;
          const variableDefault = defaultVariables[varName];
          const variableFlat = flatVariables[varName];
          const hasNoVariables = isDebugMode && !variableDefault && !variableFlat;

          return (
            <tr key={`${el}_${varName}`} className={cn({ [jsStyles.suspiciousRow()]: hasNoVariables })}>
              <td>
                <VariableName
                  variableName={varName as string}
                  dependencies={dependencies}
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
  }

  private getCss = () => {
    return <span className={jsStyles.relativeCss()}>{this.props.row.contents}</span>;
  };
}

interface VariableNameProps {
  variableName: string;
  dependencies: string[];
  onVariableSelect: (item: ComboBoxItem) => void;
}

class VariableName extends React.Component<VariableNameProps> {
  public render() {
    return (
      <span>
        <span className={jsStyles.variableName()} onClick={this.handleVariableSelect}>
          {this.props.variableName}
        </span>
        {this.props.dependencies.length > 0 && this.renderDependencies()}
      </span>
    );
  }

  private renderDependencies() {
    const { dependencies, onVariableSelect } = this.props;
    return (
      <React.Fragment>
        <br />
        <br />
        зависит от:
        {dependencies.map(dependency => (
          <DependencyName
            key={`dependency_${dependency}`}
            dependencyName={dependency}
            onDependencySelect={onVariableSelect}
          />
        ))}
      </React.Fragment>
    );
  }

  private handleVariableSelect = () => {
    const { variableName, onVariableSelect } = this.props;
    if (onVariableSelect) {
      onVariableSelect({ value: variableName, label: variableName });
    }
  };
}

interface DependencyNameProps {
  dependencyName: string;
  onDependencySelect: (item: ComboBoxItem) => void;
}
class DependencyName extends React.Component<DependencyNameProps> {
  public render() {
    return (
      <React.Fragment>
        <br />
        &ndash;{' '}
        <Tooltip trigger={'hover'} render={this.getValues} pos={'right middle'}>
          <span className={jsStyles.variableName()} onClick={this.handleDependencySelect}>
            {this.props.dependencyName}
          </span>
        </Tooltip>
      </React.Fragment>
    );
  }

  private getValues = () => {
    const dependencyName = this.props.dependencyName;
    const dependencyDefault = defaultVariables[dependencyName];
    const dependencyFlat = flatVariables[dependencyName];
    return (
      <React.Fragment>
        <span>Default value: {<VariableValue value={dependencyDefault} />}</span>
        <br />
        <span>Flat value: {<VariableValue value={dependencyFlat} />}</span>
      </React.Fragment>
    );
  };

  private handleDependencySelect = () => {
    const { dependencyName, onDependencySelect } = this.props;
    if (onDependencySelect) {
      onDependencySelect({ value: dependencyName, label: dependencyName });
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
    <span className={cn({ [jsStyles.undefined()]: !value })}>
      {hasExample && <span className={jsStyles.colorExample()} style={{ background: value, borderColor }} />}
      {value || 'undefined'}
    </span>
  );
};

const ShowUnusedVariables = (props: { diff: string[] }) => {
  if (props.diff.length === 0) {
    return null;
  }

  return (
    <div className={jsStyles.unusedVariablesWarning()}>
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
