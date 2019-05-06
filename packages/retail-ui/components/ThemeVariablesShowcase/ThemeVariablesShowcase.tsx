import * as React from 'react';
import styles from './ThemeVariablesShowcase.less';
import defaultVariables from '../../lib/theming/themes/DefaultTheme';
import flatVariables from '../../lib/theming/themes/FlatTheme';
import { ITheme } from '../../lib/theming/Theme';

interface DescriptionsType {
  [componentName: string]: ComponentDescriptionType;
}
interface ComponentDescriptionType {
  [elementName: string]: {
    contents: string;
    variables: Array<keyof ITheme>;
  };
}

const DESCRIPTIONS: DescriptionsType = require('./VariablesDescription');

export default class ThemeVariablesShowcase extends React.Component<{}, {}> {
  public render() {
    return Object.keys(DESCRIPTIONS).map(componentName => (
      <ComponentShowcase key={componentName} name={componentName} description={DESCRIPTIONS[componentName]} />
    ));
  }
}

interface ComponentShowcaseProps {
  name: string;
  description: ComponentDescriptionType;
}
class ComponentShowcase extends React.Component<ComponentShowcaseProps, {}> {
  public render() {
    const description = this.props.description;
    const elements = Object.keys(description);

    return (
      <React.Fragment>
        <h3>{this.props.name}</h3>
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
                    <td rowSpan={rowSpan}>.{el}</td>
                    <td rowSpan={rowSpan} className={styles.pre}>
                      {row.contents}
                    </td>
                    <td className={styles.invisibleCell} />
                    <td className={styles.invisibleCell} />
                    <td className={styles.invisibleCell} />
                  </tr>
                  {row.variables.map(variableName => {
                    const variableDefault = (defaultVariables as ITheme)[variableName];
                    const variableFlat = (flatVariables as ITheme)[variableName];
                    const isSuspicious = !variableDefault && !variableFlat;

                    return (
                      <tr
                        key={`${this.props.name}_${el}_${variableName}`}
                        className={isSuspicious ? styles.suspiciousRow : undefined}
                      >
                        <td>{variableName}</td>
                        <td>{variableDefault}</td>
                        <td>{variableFlat}</td>
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
