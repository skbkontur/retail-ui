import React, { useContext } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { isColor } from '../../lib/styles/ColorHelpers';
import { LIGHT_THEME as lightVariables } from '../../lib/theming/themes/LightTheme';
import { DARK_THEME as darkVariables } from '../../lib/theming/themes/DarkTheme';
import { ComboBox, ComboBoxItem } from '../../components/ComboBox';
import { Gapped } from '../../components/Gapped';
import { Link } from '../../components/Link';
import { Sticky } from '../../components/Sticky';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Tooltip } from '../../components/Tooltip';
import { IS_PROXY_SUPPORTED } from '../../lib/Supports';
import { Theme } from '../../lib/theming/Theme';
import { EmotionConsumer, EmotionContext } from '../../lib/theming/Emotion';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import {
  ALL_USED_VARIABLES,
  CALLS_COUNT,
  COMPONENT_DESCRIPTIONS,
  COMPONENT_DESCRIPTIONS_BY_VARIABLE,
  ComponentDescriptionType,
  ComponentRowDescriptionType,
  EXECUTION_TIME,
} from './VariablesCollector';
import { getStyles } from './ThemeShowcase.styles';

const EMPTY_ARRAY: string[] = [];

const ALL_VARIABLES = Object.keys(lightVariables) as Array<keyof Theme>;

interface ShowcaseProps {
  isDebugMode?: boolean;
}
interface ShowcaseState {
  selectedVariable?: ComboBoxItem;
}

export class ThemeShowcase extends React.Component<ShowcaseProps, ShowcaseState> {
  public state: ShowcaseState = {};
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;

  private isUnmounting = false;
  private variablesDiff: string[] = [];

  constructor(props: ShowcaseProps) {
    super(props);
    if (props.isDebugMode) {
      ALL_VARIABLES.forEach((variable) => {
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
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                return (
                  <Gapped wrap gap={30} verticalAlign={'top'}>
                    <div>
                      <Sticky side={'top'}>
                        <div className={this.styles.searchBar(theme)} data-perf-info={`${executionTime} ${callsCount}`}>
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
                        .map((componentName) => (
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
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }
  public componentWillUnmount(): void {
    this.isUnmounting = true;
  }

  private getValues(query: string) {
    const lowerCaseQuery = query && query.toLowerCase().trim();
    let allItems = ALL_USED_VARIABLES;
    if (lowerCaseQuery) {
      allItems = ALL_USED_VARIABLES.filter((usedVariable) => usedVariable.toLowerCase().startsWith(lowerCaseQuery));
    }
    return allItems.map((usedVariableName) => ({
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
    }

    return this.resetVariable();
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

function ComponentShowcase(props: ComponentShowcaseProps) {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);

  const { name, description, onVariableSelect, isDebugMode } = props;
  const elements = Object.keys(description);
  const styles = getStyles(emotion);
  return elements.length ? (
    <React.Fragment>
      <Sticky side={'top'} offset={40}>
        {(isSticky) => (
          <h2
            className={emotion.cx({
              [styles.heading(theme)]: true,
              [styles.headingSticky()]: isSticky,
            })}
          >
            {props.name}
          </h2>
        )}
      </Sticky>
      <table className={styles.table()}>
        <thead>
          <tr>
            <th className={styles.headerCell()} style={{ width: 170 }}>
              ClassName
            </th>
            <th className={styles.headerCell()} style={{ width: 210 }}>
              Variable Name
            </th>
            <th className={styles.headerCell()} style={{ width: 250 }}>
              Default Value
            </th>
            <th className={styles.headerCell()} style={{ width: 250 }}>
              Dark Value
            </th>
          </tr>
        </thead>
        <tbody>
          {elements.map((el) => (
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
  ) : null;
}

interface ComponentShowcaseRowProps {
  element: string;
  row: ComponentRowDescriptionType;
  isDebugMode?: boolean;
  onVariableSelect: (item: ComboBoxItem) => void;
}

function ComponentShowcaseRow(props: ComponentShowcaseRowProps) {
  const theme = useContext(ThemeContext);
  const emotion = useContext(EmotionContext);

  const { element: el, row, isDebugMode } = props;
  const rowSpan = row.variables.length + 1;
  const styles = getStyles(emotion);
  return (
    <React.Fragment>
      <tr className={emotion.cx(styles.invisibleRow(), { [styles.invisibleDarkRow()]: theme === darkVariables })}>
        <td className={emotion.cx(styles.cell(), styles.majorCell())} rowSpan={rowSpan}>
          <span className={styles.elementName()}>.{el}</span>
        </td>
        <td className={styles.invisibleCell()} />
        <td className={styles.invisibleCell()} />
        <td className={styles.invisibleCell()} />
      </tr>
      {row.variables.map((varName) => {
        const dependencies = row.dependencies[varName] || EMPTY_ARRAY;
        const variableDefault = lightVariables[varName] as string;
        const variableDark = darkVariables[varName] as string;
        const hasNoVariables = isDebugMode && !variableDefault;
        return (
          <tr
            key={`${el}_${varName}`}
            className={emotion.cx(styles.row(), {
              [styles.suspiciousRow()]: hasNoVariables,
              [styles.darkRow()]: theme === darkVariables,
            })}
          >
            <td className={styles.cell()}>
              <VariableName
                variableName={varName as string}
                dependencies={dependencies}
                onVariableSelect={props.onVariableSelect}
              />
            </td>
            <td className={styles.cell()}>
              <VariableValue value={variableDefault} />
            </td>
            <td className={styles.cell()}>
              <VariableValue value={variableDark} />
            </td>
          </tr>
        );
      })}
    </React.Fragment>
  );
}

interface VariableNameProps {
  variableName: string;
  dependencies: Array<keyof Theme>;
  onVariableSelect: (item: ComboBoxItem) => void;
}

function VariableName({ variableName, dependencies, onVariableSelect }: VariableNameProps) {
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <span>
      <span className={styles.variableName()} onClick={handleVariableSelect}>
        {variableName}
      </span>
      {dependencies.length > 0 && renderDependencies()}
    </span>
  );

  function renderDependencies() {
    return (
      <React.Fragment>
        <br />
        <br />
        зависит от:
        {dependencies.map((dependency) => (
          <DependencyName
            key={`dependency_${dependency}`}
            dependencyName={dependency}
            onDependencySelect={onVariableSelect}
          />
        ))}
      </React.Fragment>
    );
  }

  function handleVariableSelect() {
    if (onVariableSelect) {
      onVariableSelect({ value: variableName, label: variableName });
    }
  }
}

interface DependencyNameProps {
  dependencyName: keyof Theme;
  onDependencySelect: (item: ComboBoxItem) => void;
}

function DependencyName({ dependencyName, onDependencySelect }: DependencyNameProps) {
  const emotion = useContext(EmotionContext);
  const styles = getStyles(emotion);

  return (
    <React.Fragment>
      <br />
      &ndash;{' '}
      <Tooltip trigger={'hover'} render={getValues} pos={'right middle'}>
        <span className={styles.variableName()} onClick={handleDependencySelect}>
          {dependencyName}
        </span>
      </Tooltip>
    </React.Fragment>
  );

  function getValues() {
    const dependencyDefault = lightVariables[dependencyName] as string;
    const dependencyDark = darkVariables[dependencyName] as string;
    return (
      <React.Fragment>
        <span>Default value: {<VariableValue value={dependencyDefault} />}</span>
        <span>Dark value: {<VariableValue value={dependencyDark} />}</span>
      </React.Fragment>
    );
  }

  function handleDependencySelect() {
    if (onDependencySelect) {
      onDependencySelect({ value: dependencyName, label: dependencyName });
    }
  }
}

const VariableValue = (props: { value: string }) => {
  const emotion = useContext(EmotionContext);

  const value = props.value;
  const valueIsColor = isColor(value);
  const valueIsGradient = isGradient(value);
  const hasExample = valueIsColor || valueIsGradient;
  let borderColor = 'transparent';
  if (hasExample) {
    borderColor = valueIsColor ? ColorFunctions.contrast(value) : '#000';
  }

  const styles = getStyles(emotion);
  return (
    <span className={emotion.cx({ [styles.undefined()]: !value })}>
      {hasExample && <span className={styles.colorExample()} style={{ background: value, borderColor }} />}
      {value || 'undefined'}
    </span>
  );
};

const ShowUnusedVariables = (props: { diff: string[] }) => {
  const emotion = useContext(EmotionContext);
  if (props.diff.length === 0) {
    return null;
  }
  const styles = getStyles(emotion);

  return (
    <div className={styles.unusedVariablesWarning()}>
      Неиспользованные переменные ({props.diff.length}
      ):
      <ul>
        {props.diff.sort().map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

function isGradient(input: string) {
  return !!input && input.startsWith('linear-gradient');
}
