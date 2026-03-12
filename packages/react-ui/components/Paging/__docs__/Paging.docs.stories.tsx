import React from 'react';
import { Paging, useResponsiveLayout } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';
import type { ItemComponentProps } from '../Paging';

export default {
  title: 'Display data/Paging',
  component: Paging,
  parameters: { creevey: { skip: true } },
} as Meta;

/** Базовый пример с обязательными пропсами `activePage`, `onPageChange` и `pagesCount`. */
export const ExampleBasic: Story = () => {
  const [activePage, setActivePage] = React.useState(1);

  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} />;
};
ExampleBasic.storyName = 'Базовый пример';

/** Проп `size` задаёт размер пейджинга. */
export const ExampleSize: Story = () => {
  const [activePage, setActivePage] = React.useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size="small" />
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size="medium" />
      <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={30} size="large" />
    </div>
  );
};
ExampleSize.storyName = 'Размер';

/** Проп `disabled` блокирует переключение страниц. */
export const ExampleDisabled: Story = () => {
  const [activePage, setActivePage] = React.useState(3);

  return <Paging disabled onPageChange={setActivePage} activePage={activePage} pagesCount={8} />;
};
ExampleDisabled.storyName = 'Состояние блокировки';

/** Проп `caption` задаёт подпись на кнопке перехода вперёд. */
export const ExampleCaption: Story = () => {
  const [activePage, setActivePage] = React.useState(1);

  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={12} caption="Следующая" />;
};
ExampleCaption.storyName = 'Подпись кнопки перехода вперёд';

/** Проп `withoutNavigationHint` отключает подсказку по навигации клавишами. */
export const ExampleWithoutNavigationHint: Story = () => {
  const [activePage, setActivePage] = React.useState(7);

  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={20} withoutNavigationHint />;
};
ExampleWithoutNavigationHint.storyName = 'Отключение подсказки навигации';

/** Проп `useGlobalListener` включает глобальную навигацию по стрелкам без фокуса на компоненте. */
export const ExampleUseGlobalListener: Story = () => {
  const [activePage, setActivePage] = React.useState(4);

  return (
    <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={18} useGlobalListener caption="Дальше" />
  );
};
ExampleUseGlobalListener.storyName = 'Глобальная навигация с клавиатуры';

/** Иногда у пейджинга не нужно показывать последнюю страницу заранее.
 * [Ссылка на гайд](https://guides.kontur.ru/components/navigation/paging/#Opisanie_raboti/Peidzhing_bez_poslednei_stranitsi). */
export const ExampleWithoutLastPage: Story = () => {
  const { isMobile } = useResponsiveLayout();
  const [activePage, setActivePage] = React.useState(1);
  const totalPagesCount = 30;
  const shouldShowLastPage = activePage > totalPagesCount - (isMobile ? 2 : 4);
  const visiblePagesCount = shouldShowLastPage ? totalPagesCount : Infinity;

  return (
    <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={visiblePagesCount} caption="Дальше" />
  );
};
ExampleWithoutLastPage.storyName = 'Кастомизация: пейджинг без последней страницы';

/** Проп `component` позволяет переопределить компонент элемента пагинации. */
export const ExampleCustomItemComponent: Story = () => {
  const [activePage, setActivePage] = React.useState(1);
  const CustomPagingItem = ({ children, className, onClick, tabIndex }: ItemComponentProps) => {
    return (
      <button className={className} onClick={onClick} tabIndex={tabIndex} style={{ borderRadius: 3, margin: 4 }}>
        {children}
      </button>
    );
  };
  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={10} component={CustomPagingItem} />;
};
ExampleCustomItemComponent.storyName = 'Кастомизация: кастомный компонент элемента';

/** Статический метод `Paging.isForward` определяет, является ли элемент кнопкой перехода вперед. */
export const ExampleIsForwardMethod: Story = () => {
  const [activePage, setActivePage] = React.useState(1);
  const CustomPagingItem = ({ children, pageNumber, className, onClick, tabIndex }: ItemComponentProps) => {
    return (
      <button
        className={className}
        onClick={onClick}
        tabIndex={tabIndex}
        style={{ borderRadius: 3, margin: 4, background: Paging.isForward(pageNumber) ? '#FECB41' : '#F0F0F0' }}
      >
        {children}
      </button>
    );
  };
  return <Paging onPageChange={setActivePage} activePage={activePage} pagesCount={10} component={CustomPagingItem} />;
};
ExampleIsForwardMethod.storyName = 'Кастомизация: использование isForward';
