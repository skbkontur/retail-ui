import { IconCommentRectRegular16 } from '@skbkontur/icons/IconCommentRectRegular16';
import { IconSendPaperplaneDiagRegular16 } from '@skbkontur/icons/IconSendPaperplaneDiagRegular16';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import React, { useCallback, useMemo, useState } from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Table',
};

export const AwsomeTableExample = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-lumpa-purururu@kontur.ru',
      channal: 'teleramm',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-rururu@kontur.ru',
      channal: 'viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  return (
    <div style={{ width: '1100px' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col" width={'16px'} checkboxCell>
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
            <Table.HeaderCell scope="col">Пол</Table.HeaderCell>
            <Table.HeaderCell scope="col" width={'150px'}>
              Телефон
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">E-mail</Table.HeaderCell>
            <Table.HeaderCell scope="col">Канал</Table.HeaderCell>
            <Table.HeaderCell scope="col">Дата</Table.HeaderCell>
            <Table.HeaderCell scope="col">Регион</Table.HeaderCell>
            <Table.HeaderCell scope="col" currency>
              Сумма, ₽
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">Ответственный</Table.HeaderCell>
            <Table.HeaderCell width={'200px'} scope="col"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.sex}</Table.Cell>
              <Table.Cell noWrap>{row.phone}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.channal}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneDiagRegular16 />,
                      text: 'Проверить и отправить',
                      onClick: () => console.log('send'),
                    },
                    {
                      icon: <IconCommentRectRegular16 />,
                      text: 'Добавить комментарий',
                      onClick: () => console.log('add comment'),
                    },
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('del'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const fr2frTableExample = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-lumpa-purururu@kontur.ru',
      channal: 'teleramm',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-rururu@kontur.ru',
      channal: 'viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  return (
    <div style={{ width: '800px' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col" width={'16px'} checkboxCell>
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" width={'33.33%'}>
              Клиент
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" width={'33.33%'}>
              Пол
            </Table.HeaderCell>
            <Table.HeaderCell scope="col" width={'200px'}>
              Ответственный
            </Table.HeaderCell>
            <Table.HeaderCell width={'200px'} scope="col"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell checkboxCell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.sex}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneDiagRegular16 />,
                      text: 'Проверить и отправить',
                      onClick: () => console.log('send'),
                    },
                    {
                      icon: <IconCommentRectRegular16 />,
                      text: 'Добавить комментарий',
                      onClick: () => console.log('add comment'),
                    },
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('del'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const AwsomeTableExampleAutoResizing = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-lumpa-purururu@kontur.ru',
      channal: 'teleramm',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-rururu@kontur.ru',
      channal: 'viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  return (
    <div style={{ width: '900px' }}>
      <Table auto>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
            <Table.HeaderCell scope="col">Пол</Table.HeaderCell>
            <Table.HeaderCell scope="col">Телефон</Table.HeaderCell>
            <Table.HeaderCell scope="col">E-mail</Table.HeaderCell>
            <Table.HeaderCell scope="col">Канал</Table.HeaderCell>
            <Table.HeaderCell scope="col">Дата</Table.HeaderCell>
            <Table.HeaderCell scope="col">Регион</Table.HeaderCell>
            <Table.HeaderCell scope="col">Сумма, ₽</Table.HeaderCell>
            <Table.HeaderCell scope="col">Ответственный</Table.HeaderCell>
            <Table.HeaderCell scope="col"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.sex}</Table.Cell>
              <Table.Cell noWrap>{row.phone}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.channal}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneDiagRegular16 />,
                      text: 'Проверить и отправить',
                      onClick: () => console.log('send'),
                    },
                    {
                      icon: <IconCommentRectRegular16 />,
                      text: 'Добавить комментарий',
                      onClick: () => console.log('add comment'),
                    },
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('del'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const MultiRowHeaders = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-lumpa-purururu@kontur.ru',
      channal: 'teleramm',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      sex: 'jiraph',
      phone: '8(910)555-35-35',
      email: 'kululumpa-rururu@kontur.ru',
      channal: 'viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  return (
    <div style={{ width: '900px' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan={2} scope="col" width={'16px'} checkboxCell>
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} scope="col">
              Телефон
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={2} scope="col" bottomBorder>
              E-mail
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} vAlign="bottom" width={'10%'}>
              Канал
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2}></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell scope="col">Адрес</Table.HeaderCell>
            <Table.HeaderCell scope="col">Домен</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell noWrap>{row.phone}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>{row.channal}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneDiagRegular16 />,
                      text: 'Проверить и отправить',
                      onClick: () => console.log('send'),
                    },
                    {
                      icon: <IconCommentRectRegular16 />,
                      text: 'Добавить комментарий',
                      onClick: () => console.log('add comment'),
                    },
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('del'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
