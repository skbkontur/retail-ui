import React from 'react';
import { Gapped, Paging, useResponsiveLayout } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Paging',
  component: Paging,
  parameters: { creevey: { skip: true } },
} as Meta;

export const BasicExample: Story = () => {
  const [activePage, setActivePage] = React.useState(1);
  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} />;
};
BasicExample.storyName = 'Базовый пример';

export const SizeExample: Story = () => {
  const [activePage, setActivePage] = React.useState(1);

  return (
    <Gapped vertical gap={16}>
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size={'small'} />
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size={'medium'} />
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size={'large'} />
    </Gapped>
  );
};
SizeExample.storyName = 'Размеры пейджинга';

/** Иногда у пейджинга не следует показывать общее количество страниц.
 *
 * [Ссылка на гайд](https://guides.kontur.ru/components/navigation/paging/#Opisanie_raboti/Peidzhing_bez_poslednei_stranitsi) */
export const WithoutLastPageExample: Story = () => {
  const { isMobile } = useResponsiveLayout();
  const [activePage, setActivePage] = React.useState(1);
  const totalPagesCount = 30;
  const shouldShowLastPage = activePage > totalPagesCount - (isMobile ? 2 : 4);
  const visiblePagesCount = shouldShowLastPage ? totalPagesCount : Infinity;

  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={visiblePagesCount} />;
};
WithoutLastPageExample.storyName = 'Пейджинг без последней страницы';

export const DisabledExample: Story = () => {
  const [activePage, setActivePage] = React.useState(3);

  return (
    <Paging disabled onPageChange={(activePage) => setActivePage(activePage)} activePage={activePage} pagesCount={8} />
  );
};
DisabledExample.storyName = 'Пейджинг в отключенном состоянии';
