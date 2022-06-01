import React from 'react';

import { Select } from '../../components/Select';

import { styles } from './DataTid.styles';
import { componentsDataTid } from './componentsDataTid';

export class DataTid extends React.Component<{}, { selectedValue: string }> {
  public state = {
    selectedValue: 'все',
  };

  private components = Object.keys(componentsDataTid);

  private items = ['все', ...this.components];

  private setValue = (value: string) => {
    this.setState({ selectedValue: value });
  };

  public render() {
    const list = this.components.map((componentName: string, index: number) => {
      if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
        const dataTidList = componentsDataTid[componentName];
        return (
          <div key={index} className={styles.row()}>
            <div className={styles.leftCell()}>{componentName}</div>
            <div className={styles.rightCell()}>
              <div className={styles.dataTidContainer()}>
                <div className={styles.dataTidName()}>{Object.keys(dataTidList)}:</div>
                <div className={styles.dataTidDescription()}>{Object.values(dataTidList)}</div>
              </div>
            </div>
          </div>
        );
      }
    });

    return (
      <div>
        Выбрать компонент:
        <Select<string> items={this.items} value={this.state.selectedValue} onValueChange={this.setValue} />
        <div className={styles.row()}>
          <div className={styles.leftCell()}>Название компонента:</div>
          <div className={styles.rightCell()}>data-tid</div>
        </div>
        {list}
      </div>
    );
  }
}
