import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconMoneyTypeCoinsRegular20 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular20';
import { IconNetDownloadRegular20 } from '@skbkontur/icons/IconNetDownloadRegular20';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import React from 'react';

import { Table } from '../src/components/Table/Table';
import { SizeTableContext } from '../src/components/Table/TableContext';

export default {
  title: 'Table/ActionBar',
  component: Table.ActionBar,
};

const actionItems = [
  {
    icon: <IconSendPaperplaneRegular20 />,
    text: 'Отправить',
    onClick: () => console.log('send'),
  },
  {
    icon: <IconTechPrinterRegular20 />,
    text: 'Напечатать',
    onClick: () => console.log('print'),
  },
  {
    icon: <IconDocsPlusRegular20 />,
    text: 'Скопировать',
    onClick: () => console.log('copy'),
  },
  {
    icon: <IconMoneyTypeCoinsRegular20 />,
    text: 'Уплатить',
    onClick: () => console.log('pay'),
  },
  {
    icon: <IconNetDownloadRegular20 />,
    text: 'Скачать',
    onClick: () => console.log('download'),
  },
  {
    icon: <IconTrashCanRegular20 />,
    text: 'Удалить',
    onClick: () => console.log('delete'),
  },
];

export const Default = () => (
  <div>
    <h4>Small Size (itemsVisible=4)</h4>
    <SizeTableContext.Provider value={{ size: 'small' }}>
      <Table.ActionBar items={actionItems} itemsVisible={4} />
    </SizeTableContext.Provider>

    <h4>Medium Size (itemsVisible=3)</h4>
    <SizeTableContext.Provider value={{ size: 'medium' }}>
      <Table.ActionBar items={actionItems} itemsVisible={3} />
    </SizeTableContext.Provider>

    <h4>Large Size (itemsVisible=2)</h4>
    <SizeTableContext.Provider value={{ size: 'large' }}>
      <Table.ActionBar items={actionItems} itemsVisible={2} />
    </SizeTableContext.Provider>

    <h4>As Popup (Kebab only)</h4>
    <SizeTableContext.Provider value={{ size: 'medium' }}>
      <Table.ActionBar items={actionItems} />
    </SizeTableContext.Provider>

    <h4>With popup (Floating)</h4>
    <div style={{ position: 'relative', border: '1px solid #ccc', height: 60, padding: 10 }}>
      Row Content
      <SizeTableContext.Provider value={{ size: 'medium' }}>
        <Table.ActionBar items={actionItems} popup />
      </SizeTableContext.Provider>
    </div>
  </div>
);
Default.storyName = 'default';
