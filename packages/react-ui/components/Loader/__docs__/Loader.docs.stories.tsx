import React from 'react';
import { Loader, Button, Gapped, Input } from '@skbkontur/react-ui';

import type { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Display data/Loader',
  component: Loader,
  parameters: { creevey: { skip: true } },
} as Meta;

export const ExampleBasic: Story = () => {
  const [isActive, setIsActive] = React.useState(true);
  return (
    <>
      <Button onClick={() => setIsActive(!isActive)}>{isActive ? 'Скрыть лоадер' : 'Показать лоадер'}</Button>

      <Loader active={isActive}>
        <p>
          Заполнение бумажных платежных поручений традиционно требует колоссального внимания и предельной концентрации,
          так как малейшая ошибка в любой цифре может привести к серьезным финансовым последствиям или задержкам в
          зачислении средств. Современная система автоматизации позволяет полностью исключить человеческий фактор,
          формируя электронные платежки в автоматическом режиме. Теперь вам не нужно вручную вводить сложные коды
          бюджетной классификации, реквизиты плательщика или данные налоговой инспекции — все необходимые поля
          заполняются системой самостоятельно на основе актуальных данных. Вы можете гибко выбирать наиболее подходящий
          формат документа, будь то вариант для внутреннего согласования с директором, файл для отправки в банковскую
          систему или версия для оплаты через банкомат.
        </p>
      </Loader>
    </>
  );
};

ExampleBasic.storyName = 'Базовый пример';

/**
 * Проп `caption` задаёт подпись для лоадера. Примеры наиболее подходящих формулировок перечислены в [Гайде](https://guides.kontur.ru/components/progress-indicators/spinner/).
 */
export const ExampleCaption: Story = () => {
  const [isActive, setIsActive] = React.useState(true);
  return (
    <>
      <Button onClick={() => setIsActive(!isActive)}>{isActive ? 'Скрыть лоадер' : 'Показать лоадер'}</Button>

      <Loader caption="Проверка отчета" active={isActive}>
        <p>
          Заполнение бумажных платежных поручений традиционно требует колоссального внимания и предельной концентрации,
          так как малейшая ошибка в любой цифре может привести к серьезным финансовым последствиям или задержкам в
          зачислении средств. Современная система автоматизации позволяет полностью исключить человеческий фактор,
          формируя электронные платежки в автоматическом режиме. Теперь вам не нужно вручную вводить сложные коды
          бюджетной классификации, реквизиты плательщика или данные налоговой инспекции — все необходимые поля
          заполняются системой самостоятельно на основе актуальных данных. Вы можете гибко выбирать наиболее подходящий
          формат документа, будь то вариант для внутреннего согласования с директором, файл для отправки в банковскую
          систему или версия для оплаты через банкомат.
        </p>
      </Loader>
    </>
  );
};

ExampleCaption.storyName = 'Подпись лоадера';

/**
 * Проп `type` задаёт размер лоадера.
 * Доступные размеры:
 * - big — для использования в рамках всей страницы.
 * - normal (по умолчанию) — для показа в модальных окнах и компонентах среднего размера.
 * - mini — для встраивания в строку или небольшой контрол.
 */
export const ExampleSize: Story = () => {
  const [isActive, setIsActive] = React.useState(true);
  const Content = () => (
    <>
      <p>
        Заполнение бумажных платежных поручений традиционно требует колоссального внимания и предельной концентрации,
        так как малейшая ошибка в любой цифре может привести к серьезным финансовым последствиям или задержкам в
        зачислении средств. Современная система автоматизации позволяет полностью исключить человеческий фактор,
        формируя электронные платежки в автоматическом режиме. Теперь вам не нужно вручную вводить сложные коды
        бюджетной классификации, реквизиты плательщика или данные налоговой инспекции — все необходимые поля заполняются
        системой самостоятельно.
      </p>
    </>
  );
  return (
    <>
      <Button onClick={() => setIsActive(!isActive)}>{isActive ? 'Скрыть лоадер' : 'Показать лоадер'}</Button>

      <Loader type="big" caption="big" active={isActive}>
        <Content />
      </Loader>

      <Loader type="normal" caption="normal" active={isActive}>
        <Content />
      </Loader>

      <Loader type="mini" caption="mini" active={isActive}>
        <Content />
      </Loader>
    </>
  );
};

ExampleSize.storyName = 'Размеры';

/**
 * Для того чтобы спиннер не мигал, применяются 2 пропса:
 * - `delayBeforeSpinnerShow` — задержка перед показом лоадера (по умолчанию 300 миллисекунд)
 * - `minimalDelayBeforeSpinnerHide` — минимальное время показа лоадера (по умолчанию 1 секунда)
 */
export const ExampleTime: Story = () => {
  const [loading, setLoading] = React.useState(false);
  const [delayBeforeShow, setDelayBeforeShow] = React.useState(300);
  const [minDisplayTime, setMinDisplayTime] = React.useState(1000);
  return (
    <>
      <Gapped vertical gap={12}>
        <Gapped gap={32}>
          <label htmlFor="delayBeforeSpinnerShow">
            delayBeforeSpinnerShow
            <div style={{ marginTop: 4 }}>
              <Input
                id="delayBeforeSpinnerShow"
                suffix="ms"
                disabled={loading}
                value={delayBeforeShow.toString()}
                onValueChange={(v) => setDelayBeforeShow(Number(v) || 0)}
              />
            </div>
          </label>
          <label htmlFor="minimalDelayBeforeSpinnerHide">
            minimalDelayBeforeSpinnerHide
            <div style={{ marginTop: 4 }}>
              <Input
                id="minimalDelayBeforeSpinnerHide"
                suffix="ms"
                disabled={loading}
                value={minDisplayTime.toString()}
                onValueChange={(v) => setMinDisplayTime(Number(v) || 0)}
              />
            </div>
          </label>
        </Gapped>

        <Button onClick={() => setLoading(!loading)}>{loading ? 'Остановить' : 'Показать лоадер'}</Button>

        <div style={{ maxWidth: 434, background: '#F2F2F2', borderRadius: 8, marginTop: 8 }}>
          <Loader
            active={loading}
            type="normal"
            caption="Проверяем отчёт"
            delayBeforeSpinnerShow={delayBeforeShow}
            minimalDelayBeforeSpinnerHide={minDisplayTime}
          >
            <div style={{ padding: 24 }}>
              Заполнение бумажных платежных поручений требует колоссального внимания. Автоматизация исключает
              человеческий фактор: система самостоятельно заполняет КБК и реквизиты на основе актуальных данных.
            </div>
          </Loader>
        </div>
      </Gapped>
    </>
  );
};

ExampleTime.storyName = 'Тайминги';
