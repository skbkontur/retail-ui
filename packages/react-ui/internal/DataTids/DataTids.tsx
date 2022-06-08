import React from 'react';

import { styles } from './DataTids.styles';
import { componentsDataTids } from './componentsDataTids';

export class DataTids extends React.Component {
  private components = Object.keys(componentsDataTids);

  public render() {
    return (
      <div>
        {this.components.map((componentName: string, index: number) => {
          const dataTidList = componentsDataTids[componentName];
          return (
            <div key={index} className={styles.row()}>
              <div className={styles.leftCell()}>{Object.keys(dataTidList)}:</div>
              <div className={styles.rightCell()}>
                {Object.values(dataTidList)[0]
                  .split(',')
                  .map((el: string, i: number, array) => {
                    const dataTid = el.split(':');
                    return (
                      <div key={i} className={styles.dataTid()}>
                        {<b>{dataTid[0]}: </b>}
                        {dataTid[1]}
                        {i < array.length - 1 ? ',' : ''}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
