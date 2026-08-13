import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Token',
  component: Table.Token,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const [tokens, setTokens] = React.useState([
    { key: 'city', caption: 'Город: Москва' },
    { key: 'status', caption: 'Статус: Новый' },
    { key: 'amount', caption: 'Сумма: до 500 000 ₽' },
  ]);

  const removeToken = (key: string) => setTokens((prev) => prev.filter((token) => token.key !== key));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 12 }}>
      {tokens.length === 0 ? (
        <span>Все токены сброшены</span>
      ) : (
        tokens.map((token) => (
          <Table.Token key={token.key} caption={token.caption} onRemove={() => removeToken(token.key)} />
        ))
      )}
    </div>
  );
};
