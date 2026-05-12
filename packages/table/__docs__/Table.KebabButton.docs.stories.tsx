import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.KebabButton',
  component: Table.HeaderButton,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  return (
    <>
      <Table.KebabButton active size="small" />
      <Table.KebabButton />
    </>
  );
};
