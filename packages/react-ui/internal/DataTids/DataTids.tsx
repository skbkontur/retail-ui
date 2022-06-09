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
    const list = this.components.map((componentName: string, index: number) => {
      if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
        const dataTidList = componentsDataTids[componentName];
        return (
          <div key={index} className={styles.wrapper()}>
            <div className={styles.componentName()}>{componentName}</div>
            {Object.values(dataTidList)[0]
              .split(',')
              .map((el: string, i: number) => {
                const dataTid = el.split(':');
                return (
                  <div key={i} className={styles.row()}>
                    <div className={styles.leftCell()}>{`${Object.keys(dataTidList)}.${dataTid[0]}`}</div>
                    <div className={styles.rightCell()}>{dataTid[1]}</div>
                  </div>
                );
              })}
          </div>
        );
      }
      return null;
    });

    return (
      <div>
        Выбрать компонент:
        <Select<string> items={this.items} value={this.state.selectedValue} onValueChange={this.setValue} search />
        {list}
      </div>
    );
  }
}
