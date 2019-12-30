import * as React from 'react';
import { TokenInput } from '../../TokenInput';
import { Token, TokenColors } from '../../Token';

async function getItems(query: string) {
  return Promise.resolve(
    ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'].filter(
      x => x.toLowerCase().includes(query.toLowerCase()) || x.toString() === query,
    ),
  ).then(
    (res: string[]) => new Promise<string[]>(resolve => setTimeout(resolve.bind(null, res), 500)),
  );
}

const tokenColors: { [key: string]: TokenColors } = {
  First: {
    idle: 'grayIdle',
    active: 'grayActive',
  },
  Second: {
    idle: 'blueIdle',
    active: 'blueActive',
  },
  Third: {
    idle: 'greenIdle',
    active: 'greenActive',
  },
  Fourth: {
    idle: 'yellowIdle',
    active: 'yellowActive',
  },
  Fifth: {
    idle: 'redIdle',
    active: 'redActive',
  },
  Sixth: {
    idle: 'white',
    active: 'black',
  },
  default: {
    idle: 'defaultIdle',
    active: 'defaultActive',
  },
};

export class TokenInputPlayground extends React.Component<any, any> {
  public state = { selectedItems: ['First', 'Second'] };

  public render() {
    return (
      <TokenInput
        getItems={getItems}
        selectedItems={this.state.selectedItems}
        renderToken={(item, { isActive, onClick, onRemove }) => (
          <Token
            key={item.toString()}
            colors={tokenColors[item] || tokenColors.default}
            isActive={isActive}
            onClick={onClick}
            onRemove={onRemove}
          >
            {item}
          </Token>
        )}
        onChange={itemsNew => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}
