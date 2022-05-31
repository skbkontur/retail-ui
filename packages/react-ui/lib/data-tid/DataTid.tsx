import React from 'react';

import { Select } from '../../components/Select';

import { styles } from './DataTid.styles';
import { componentsDataTid } from './componentsDataTid';

export class DataTid extends React.Component<{}, { selectedValue: string }> {
  public state = {
    selectedValue: 'все',
  };

  private items = ['все', ...componentsDataTid.map((el) => Object.keys(el)[0])];

  private setValue = (value: string) => {
    this.setState({ selectedValue: value });
  };

  public render() {
    const list = componentsDataTid.map((element: { [key: string]: any }, index) => {
      const componentName = Object.keys(element)[0];
      if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
        const dataTidList = element[componentName].map((value: { [key: string]: string }, i: number) => {
          return (
            <div key={i} className={styles.dataTidContainer()}>
              <div className={styles.dataTidName()}>{Object.keys(value)}:</div>
              <div className={styles.dataTidDescription()}>{Object.values(value)}</div>
            </div>
          );
        });
        return (
          <div key={index} className={styles.row()}>
            <div className={styles.leftCell()}>{componentName}</div>
            <div className={styles.rightCell()}>{dataTidList}</div>
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
