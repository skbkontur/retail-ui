import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.KebabButton',
  component: Table.KebabButton,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const actionItems = [
    {
      icon: <IconSendPaperplaneRegular16 />,
      text: 'Отправить',
      onClick: () => console.log('send'),
    },
    {
      icon: <IconTrashCanRegular16 />,
      text: 'Удалить',
      onClick: () => console.log('delete'),
      danger: true,
    },
  ];

  return (
    <div style={{ display: 'grid', gap: 16, padding: 12, alignItems: 'start' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Table.KebabButton size="small" />
        <Table.KebabButton active size="small" />
        <Table.KebabButton size="medium" />
        <Table.KebabButton active size="medium" />
      </div>

      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Документ</Table.HeaderCell>
            <Table.HeaderCell width="60px" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Договор поставки</Table.Cell>
            <Table.Cell>
              <Table.ActionBar
                popup
                itemsVisible={0}
                items={actionItems}
                caption={({ opened, openMenu }) => (
                  <Table.KebabButton active={opened} size="small" onClick={() => openMenu()} />
                )}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
