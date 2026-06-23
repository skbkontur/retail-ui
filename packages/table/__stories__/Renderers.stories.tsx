import { Table } from '@skbkontur/table';
import React from 'react';

import { Grid, CSPRenderer, DelayedAttachmentRenderer, IframeRenderer, ShadowDOMRenderer } from './StoryHelpers';

export default {
  title: 'Table / Renderers',
  parameters: {
    creevey: {
      captureElement: '#grid',
    },
  },
};

const DemoTable = () => {
  const rows = [
    { id: 1, client: 'ООО «Кавычки»', status: 'Новый', amount: '85 000' },
    { id: 2, client: 'Рыков Н. В.', status: 'В работе', amount: '127 000' },
  ];

  return (
    <div style={{ width: 760 }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
            <Table.HeaderCell scope="col">Статус</Table.HeaderCell>
            <Table.HeaderCell scope="col" currency>
              Сумма, ₽
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
              <Table.Cell currency>{row.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const Standard = () => (
  <Grid col={1}>
    <DemoTable />
  </Grid>
);

export const ShadowDOM = () => {
  return (
    <Grid col={1}>
      <ShadowDOMRenderer>
        <DemoTable />
      </ShadowDOMRenderer>
    </Grid>
  );
};

export const Iframe = () => {
  return (
    <Grid col={1}>
      <IframeRenderer>
        <DemoTable />
      </IframeRenderer>
    </Grid>
  );
};

export const DelayedAttachment = () => {
  return (
    <Grid col={1}>
      <DelayedAttachmentRenderer>
        <DemoTable />
      </DelayedAttachmentRenderer>
    </Grid>
  );
};

export const ShadowDOMInIframe = () => {
  return (
    <Grid col={1}>
      <IframeRenderer>
        <ShadowDOMRenderer>
          <DemoTable />
        </ShadowDOMRenderer>
      </IframeRenderer>
    </Grid>
  );
};

export const DelayedAttachmentInShadowDOM = () => {
  return (
    <Grid col={1}>
      <ShadowDOMRenderer>
        <DelayedAttachmentRenderer>
          <DemoTable />
        </DelayedAttachmentRenderer>
      </ShadowDOMRenderer>
    </Grid>
  );
};

export const DelayedAttachmentInShadowDOMInIframe = () => {
  return (
    <Grid col={1}>
      <IframeRenderer>
        <ShadowDOMRenderer>
          <DelayedAttachmentRenderer>
            <DemoTable />
          </DelayedAttachmentRenderer>
        </ShadowDOMRenderer>
      </IframeRenderer>
    </Grid>
  );
};

export const CSPCompliance = () => {
  return (
    <Grid col={1}>
      <CSPRenderer>
        <DemoTable />
      </CSPRenderer>
    </Grid>
  );
};
CSPCompliance.parameters = {
  creevey: {
    skip: {
      "Only works well in Chrome, but that's enough": { in: /^(?!\bchrome\b)/ },
    },
  },
};
