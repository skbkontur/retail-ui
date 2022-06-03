import React from 'react';

import { Select } from '../../components/Select';
import { cx } from '../theming/Emotion';

import { styles } from './DataTids.styles';
import { componentsDataTids } from './componentsDataTids';

export class DataTids extends React.Component<{}, { selectedValue: string }> {
  public state = {
    selectedValue: 'все',
  };

  private components = Object.keys(componentsDataTids);

  private items = ['все', ...this.components];

  private setValue = (value: string) => {
    this.setState({ selectedValue: value });
  };

  public render() {
    const list = this.components.map((componentName: string, index: number) => {
      if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
        const dataTidList = componentsDataTids[componentName];
        return (
          <div key={index} className={styles.row()}>
            <div className={styles.leftCell()}>{Object.keys(dataTidList)}:</div>
            <div className={styles.rightCell()}>
              {Object.values(dataTidList)[0]
                .split(',')
                .map((el: string, i: number) => (
                  <div key={i}>{el}</div>
                ))}
            </div>
          </div>
        );
      }
    });

    return (
      <div>
        Выбрать компонент:
        <Select<string> items={this.items} value={this.state.selectedValue} onValueChange={this.setValue} search />
        <div className={cx(styles.row(), styles.headRow())}>
          <div className={styles.leftCell()}>VariableName</div>
          <div className={styles.rightCell()}>Value</div>
        </div>
        {list}
      </div>
    );
  }
}
