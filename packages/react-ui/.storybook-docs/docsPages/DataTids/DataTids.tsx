import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { Select } from '../../../components/Select';
import { withRenderEnvironment } from '../../../lib/renderEnvironment';

import { componentsDataTids } from './componentsDataTids';
import { getStyles } from './DataTids.styles';

interface DataTidsState {
  selectedValue: string;
}

@withRenderEnvironment
export class DataTids extends React.Component {
  public state: DataTidsState = {
    selectedValue: 'все',
  };

  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;

  private components = Object.keys(componentsDataTids);

  private items = ['все', ...this.components];

  private setValue = (value: string) => {
    this.setState({ selectedValue: value });
  };

  public render() {
    this.styles = getStyles(this.emotion);

    return (
      <div>
        Выбрать компонент:
        <Select<string> items={this.items} value={this.state.selectedValue} onValueChange={this.setValue} search />
        {Object.entries(componentsDataTids).map(([componentName, dataTids], index) => {
          if (componentName === this.state.selectedValue || this.state.selectedValue === 'все') {
            return (
              <div key={index} className={this.styles.wrapper()}>
                <div className={this.styles.componentName()}>{componentName}</div>
                {Object.values(dataTids).map((value, i) => {
                  return (
                    <div key={i} className={this.styles.row()}>
                      <div className={this.styles.leftCell()}>{`${componentName}DataTids.${value[0]}`}</div>
                      <div className={this.styles.rightCell()}>{`'${value[1]}'`}</div>
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
