import React from 'react';
import { Table } from '../src/components/Table/Table';
import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconDocsPlusRegular16 } from '@skbkontur/icons/IconDocsPlusRegular16';
import { IconNetDownloadRegular16 } from '@skbkontur/icons/IconNetDownloadRegular16';
import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem';

export default {
  title: 'Components/Table.ActionBar',
  component: Table.ActionBar,
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
      icon: <IconTechPrinterRegular16 />,
      text: 'Напечатать',
      onClick: () => console.log('print'),
      danger: true,
    },
    {
      icon: <IconDocsPlusRegular16 />,
      text: 'Скопировать',
      onClick: () => console.log('copy'),
    },
    {
      icon: <IconMoneyTypeCoinsRegular16 />,
      text: 'Уплатить',
      onClick: () => console.log('pay'),
    },
    {
      icon: <IconNetDownloadRegular16 />,
      text: 'Скачать',
      onClick: () => console.log('download'),
    },
    {
      icon: <IconTrashCanRegular16 />,
      text: 'Удалить',
      onClick: () => console.log('delete'),
      danger: true,
    },
  ];

  const customMenu = [
    {
      text: <MenuHeader>Заголовок меню</MenuHeader>,
    },
    {
      text: <MenuItem>Раз</MenuItem>,
    },
    {
      text: <MenuSeparator />,
    },
    {
      text: <MenuItem>Раз</MenuItem>,
    },
  ];

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.HeaderCell width="240px">Экшены</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Пример документа</Table.Cell>
          <Table.Cell>
            <Table.ActionBar items={actionItems} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Пример с popup</Table.Cell>
          <Table.Cell>
            <Table.ActionBar items={actionItems.slice(0, 3)} popup />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Пример popup</Table.Cell>
          <Table.Cell>
            <Table.ActionBar items={actionItems} popup />
          </Table.Cell>
        </Table.Row>
        <Table.Row onClick={() => console.log(12)}>
          <Table.Cell>Пример popup</Table.Cell>
          <Table.Cell>
            <Table.ActionBar items={actionItems} popup itemsVisible={1} />
          </Table.Cell>
        </Table.Row>
        <Table.Row onClick={() => console.log(12)}>
          <Table.Cell>Пример popup caption</Table.Cell>
          <Table.Cell>
            <Table.ActionBar
              caption={<Table.KebabButton active={true} size="small" />}
              items={actionItems}
              popup
              itemsVisible={0}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row onClick={() => console.log(12)}>
          <Table.Cell>Пример popup caption with opennead to active</Table.Cell>
          <Table.Cell>
            <Table.ActionBar
              caption={({ opened, openMenu }) => (
                <Table.KebabButton active={opened} size="small" onClick={() => openMenu()} />
              )}
              items={customMenu}
              popup
              itemsVisible={0}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row onClick={() => console.log(12)}>
          <Table.Cell>Пример popup caption with opennead to active</Table.Cell>
          <Table.Cell>
            <Table.ActionBar
              caption={({ opened }) => <Table.KebabButton active={opened} size="small" />}
              items={actionItems}
              popup
              itemsVisible={0}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
