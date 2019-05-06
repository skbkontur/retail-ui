import * as React from 'react';
import styles from './ThemeVariablesShowcase.less';
import defaultVariables from '../../lib/theming/themes/DefaultTheme';
import flatVariables from '../../lib/theming/themes/FlatTheme';
import { ITheme } from '../../lib/theming/Theme';
import { cx } from 'emotion';

interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}
interface ComponentDescriptionType {
  [elementName: string]: {
    contents: string;
    variables: Array<keyof ITheme>;
  };
}

interface ThemeVariablesShowcaseProps {
  isDebugMode?: boolean;
}

const DESCRIPTIONS: DescriptionsType = require('./VariablesDescription');

export default class ThemeVariablesShowcase extends React.Component<ThemeVariablesShowcaseProps, {}> {
  public render() {
    return Object.keys(DESCRIPTIONS).map(componentName => (
      <ComponentShowcase
        key={componentName}
        name={componentName}
        description={DESCRIPTIONS[componentName]}
        isDebugMode={this.props.isDebugMode}
      />
    ));
  }
}

interface ComponentShowcaseProps {
  name: string;
  description: ComponentDescriptionType;
  isDebugMode?: boolean;
}
class ComponentShowcase extends React.Component<ComponentShowcaseProps, {}> {
  public render() {
    const description = this.props.description;
    const elements = Object.keys(description);

    const { isDebugMode } = this.props;

    return (
      <React.Fragment>
        <h2 className={styles.heading}>{this.props.name}</h2>
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
                  {row.variables.map(variableName => {
                    const variableDefault = (defaultVariables as ITheme)[variableName];
                    const variableFlat = (flatVariables as ITheme)[variableName];
                    const hasNoVariables = isDebugMode && !variableDefault && !variableFlat;
                    const hasOnlyDefaultVariable = isDebugMode && variableDefault && !variableFlat;

                    return (
                      <tr
                        key={`${this.props.name}_${el}_${variableName}`}
                        className={hasNoVariables ? styles.suspiciousRow : undefined}
                      >
                        <td
                          className={cx(
                            styles.variableName,
                            hasOnlyDefaultVariable ? styles.suspiciousCell : undefined,
                          )}
                        >
                          {variableName}
                        </td>
                        <td className={variableDefault ? undefined : styles.undefined}>{variableDefault || 'undefined'}</td>
                        <td className={variableFlat ? undefined : styles.undefined}>{variableFlat || 'undefined'}</td>
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
