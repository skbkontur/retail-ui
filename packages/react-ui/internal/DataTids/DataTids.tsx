import React from 'react';

import { Select } from '../../components/Select';

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
    return (
      <div>
        Выбрать компонент:
        <Select<string> items={this.items} value={this.state.selectedValue} onValueChange={this.setValue} search />
        {Object.entries(componentsDataTids).map(([componentName, dataTids], index) => {
          if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
            return (
              <div key={index} className={styles.wrapper()}>
                <div className={styles.componentName()}>{componentName}</div>
                {Object.values(dataTids).map((value, i) => {
                  return (
                    <div key={i} className={styles.row()}>
                      <div className={styles.leftCell()}>{`${componentName}DataTids.${value[0]}`}</div>
                      <div className={styles.rightCell()}>{`'${value[1]}'`}</div>
                    </div>
                  );
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}
