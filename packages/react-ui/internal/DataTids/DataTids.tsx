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
            <div key={index} className={styles.wrapper()}>
              <div className={styles.componentName()}>{Object.keys(dataTidList)}</div>
              {Object.values(dataTidList)[0]
                .split(',')
                .map((el: string, i: number) => {
                  const dataTid = el.split(':');
                  return (
                    <div key={i} className={styles.row()}>
                      <div className={styles.leftCell()}>{dataTid[0]}</div>
                      <div className={styles.rightCell()}>{dataTid[1]}</div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    );
  }
}
