import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { IconNotificationBellAlarmRegular64 } from '@skbkontur/icons/IconNotificationBellAlarmRegular64';
import { IconNotificationBellAlarmSolid16 } from '@skbkontur/icons/IconNotificationBellAlarmSolid16';
import { IconTrashCanLight16 } from '@skbkontur/icons/IconTrashCanLight16';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { Button, Gapped, MiniModal, ThemeContext } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Overlay/MiniModal/MiniModal',
  component: MiniModal,
  parameters: { creevey: { skip: true } },
};

export default meta;

/** Самый простой вариант использования: */
export const ExampleBasic: Story = () => {
  const PayNotifice = () => {
    const [isOpened, setIsOpened] = React.useState(false);

    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    return (
      <>
        {isOpened && (
          <MiniModal>
            <MiniModal.Header>Простое уведомление</MiniModal.Header>
            <MiniModal.Body>
              Это простое, но достаточно важное уведомление, чтобы его показать в мини-модалке
            </MiniModal.Body>
            <MiniModal.Footer>
              <Button size="medium" use="accent" onClick={close}>
                Понятно
              </Button>
            </MiniModal.Footer>
          </MiniModal>
        )}
        <Button use="pay" onClick={open} icon={<IconMoneyTypeCoinsRegular16 />}>
          Мини-модалка
        </Button>
      </>
    );
  };

  return <PayNotifice />;
};
ExampleBasic.storyName = 'Уведомление о платеже';

/** Иногда от пользователя требуется выбрать одно из доступных действий.
Например, подтвердить важное действие или отклонить его: */
export const ExampleConfirmDelete: Story = () => {
  const ConfirmDelete = ({ name, handleDelete }: { name: string; handleDelete: () => void }) => {
    const theme = React.useContext(ThemeContext);

    const [isOpened, setIsOpened] = React.useState(false);

    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const mainAction = () => {
      handleDelete();
      close();
    };

    return (
      <>
        {isOpened && (
          <MiniModal>
            <MiniModal.Header icon={<IconTrashCanRegular16 size={64} color={theme.btnDangerBg} />}>
              Удалить "{name}"?
            </MiniModal.Header>
            <MiniModal.Footer direction="column">
              <Button use="danger" size="medium" onClick={mainAction}>
                Удалить
              </Button>
              <Button size="medium" onClick={close}>
                Отменить
              </Button>
            </MiniModal.Footer>
          </MiniModal>
        )}
        <Button onClick={open} icon={<IconTrashCanLight16 />} />
      </>
    );
  };

  const list = ['Отчёт № 111', 'Отчёт № 222', 'Отчёт № 333'];

  return (
    <Gapped vertical>
      {list.map((name) => (
        <Gapped key={name}>
          <div style={{ width: 200, borderBottom: 'dashed 1px' }}>{name}</div>
          <span>
            <ConfirmDelete name={name} handleDelete={() => alert(`${name} удалён`)} />
          </span>
        </Gapped>
      ))}
    </Gapped>
  );
};
ExampleConfirmDelete.storyName = 'Подтверждение удаления';

/** Одно и то же диалоговое окно может вызываться в разных частях приложения.
В таком случае стоит реализовать паттерн синглтона: */
export const ExampleSingleton: Story = () => {
  const EnableNotification = React.forwardRef<
    { open: () => void; close: () => void },
    { setStatus: (status: string) => void }
  >(({ setStatus }, ref) => {
    const [isOpened, setIsOpened] = React.useState(false);

    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const handleAllowAll = () => {
      setStatus('Разрешить все');
      close();
    };
    const handleAllowBasic = () => {
      setStatus('Разрешить только основные');
      close();
    };
    const handleDenyAll = () => {
      setStatus('Запретить');
      close();
    };

    React.useImperativeHandle(ref, () => ({ open, close }), []);

    return isOpened ? (
      <MiniModal>
        <MiniModal.Header icon={<IconNotificationBellAlarmRegular64 />}>Разрешить уведомления?</MiniModal.Header>
        <MiniModal.Footer direction="column">
          <Button use="accent" size="medium" onClick={handleAllowAll}>
            Разрешить все
          </Button>
          <Button size="medium" onClick={handleAllowBasic}>
            Разрешить только основные
          </Button>
          <MiniModal.Indent />
          <Button size="medium" onClick={handleDenyAll}>
            Запретить
          </Button>
        </MiniModal.Footer>
      </MiniModal>
    ) : null;
  });

  const [status, setStatus] = React.useState('-не выбрано-');

  const NotificationEnableRef = React.useRef<React.ComponentRef<typeof EnableNotification>>(null);

  const NotificationEnableOpen = () => NotificationEnableRef.current && NotificationEnableRef.current.open();

  return (
    <>
      <EnableNotification ref={NotificationEnableRef} setStatus={setStatus} />
      <Gapped vertical>
        <span>
          <IconNotificationBellAlarmSolid16 /> Статус уведомлений: {status}
        </span>
        <Button use="text" theme={{ btnTextBg: '#D6D6D6' }} onClick={NotificationEnableOpen}>
          Разрешить уведомления 1
        </Button>
        <Button use="text" theme={{ btnTextBg: '#E6E6E6' }} onClick={NotificationEnableOpen}>
          Разрешить уведомления 2
        </Button>
        <Button use="text" theme={{ btnTextBg: '#F0F0F0' }} onClick={NotificationEnableOpen}>
          Разрешить уведомления 3
        </Button>
      </Gapped>
    </>
  );
};
ExampleSingleton.storyName = 'Одна модалка, несколько кнопок открытия';

/** Некоторые действия для корректного исполнения требуют блокировки других действий пользователя.
В таких случаях можно, например, использовать проп `loading` для `Button`, и не позволять закрыть окно до конца исполнения: */
export const ExampleLoadingButton: Story = () => {
  const WaitingUpdate = ({
    handleUpdate,
    setLastUpdated,
  }: {
    handleUpdate: () => Promise<unknown>;
    setLastUpdated: (date: Date) => void;
  }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpened, setIsOpened] = React.useState(false);

    const open = () => setIsOpened(true);
    const close = () => setIsOpened(false);

    const handleMainClick = () => {
      setIsLoading(true);
      handleUpdate().then(() => {
        setIsLoading(false);
        setIsOpened(false);
        setLastUpdated(new Date());
      });
    };

    return (
      <>
        {isOpened && (
          <MiniModal>
            <MiniModal.Header>Обновить?</MiniModal.Header>
            <MiniModal.Body>
              После вашего подтверждения другие действия на странице будут заблокированы на несколько секунд.
            </MiniModal.Body>
            <MiniModal.Footer>
              <Button use="success" size="medium" onClick={handleMainClick} loading={isLoading}>
                Обновить
              </Button>
              <Button size="medium" onClick={close} disabled={isLoading}>
                Отменить
              </Button>
            </MiniModal.Footer>
          </MiniModal>
        )}
        <Button onClick={open} use="success">
          Обновить
        </Button>
      </>
    );
  };

  const dateTimeFormat = new Intl.DateTimeFormat('nu', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  const handleUpdate = () => new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <Gapped>
      <WaitingUpdate handleUpdate={() => handleUpdate()} setLastUpdated={setLastUpdated} />
      <span>Последнее обновление: {dateTimeFormat.format(lastUpdated)}</span>
    </Gapped>
  );
};
ExampleLoadingButton.storyName = 'Загрузка на кнопке: окно не закрыть до конца';

/**
 * Если задан `onClose`, мини-модалка реагирует на Esc и на клик по затемнённому фону (если
 * не задано иное, см. следующий пример). Сценарий без однозначного действия по кнопкам в футере при этом
 * осознанно &quot;мягче&quot;, чем в типичной мини-модалке.
 */
export const ExampleRootPropsOnClose: Story = () => {
  const [isOpened, setOpened] = React.useState(false);
  return (
    <>
      {isOpened && (
        <MiniModal onClose={() => setOpened(false)}>
          <MiniModal.Header>Можно закрыть с клавиатуры и по фону</MiniModal.Header>
          <MiniModal.Body>
            Нажмите Esc или кликните мимо окна (по серому фону). Сработает onClose, окно снимется с экрана.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setOpened(false)}>
              Или эта кнопка
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setOpened(true)}>Открыть (с onClose)</Button>
    </>
  );
};
ExampleRootPropsOnClose.storyName = 'Закрытие по Esc, клику по фону и кнопке (onClose)';

/**
 * - `ignoreBackgroundClick` — клик по фону не вызывает закрытие; Esc по-прежнему вызывает
 *   `onClose` (так устроен `Modal`).
 * - `disableClose` — `requestClose` не срабатывает: ни Esc, ни фон (при `onClose` передан)
 *   не закроют окно, остаётся кнопка.
 */
export const ExampleRootPropsCloseGuards: Story = () => {
  const [isIgnoreBg, setIgnoreBg] = React.useState(false);
  const [isDisableClose, setDisableClose] = React.useState(false);

  return (
    <Gapped vertical>
      {isIgnoreBg && (
        <MiniModal onClose={() => setIgnoreBg(false)} ignoreBackgroundClick>
          <MiniModal.Header>Клик по фону не закрывает</MiniModal.Header>
          <MiniModal.Body>
            ignoreBackgroundClick: клик по фону ничего не сделает. Попробуйте Esc — окно закроется.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setIgnoreBg(false)}>
              Закрыть
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      {isDisableClose && (
        <MiniModal onClose={() => setDisableClose(false)} disableClose>
          <MiniModal.Header>Esc и фон не закрывают</MiniModal.Header>
          <MiniModal.Body>
            disableClose отключает срабатывание onClose из Modal (в т.ч. по Esc). Закрытие — только кнопкой.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setDisableClose(false)}>
              Закрыть
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Gapped>
        <Button onClick={() => setIgnoreBg(true)}>ignoreBackgroundClick</Button>
        <Button onClick={() => setDisableClose(true)}>disableClose</Button>
      </Gapped>
    </Gapped>
  );
};
ExampleRootPropsCloseGuards.storyName = 'Клик по фону не закрывает; полный запрет закрытия';

/**
 * `alignTop` прижимает карточку к верхней части области просмотра (на десктопе; см. `Modal`), полезно
 * при невысоком вьюпорте или вместе с длинной страницей. Ниже — длинный блок, чтобы на узком окне был виден
 * сдвиг.
 */
export const ExampleRootPropsAlignTop: Story = () => {
  const [isOpened, setOpened] = React.useState(false);
  return (
    <div style={{ maxWidth: 640 }}>
      {isOpened && (
        <MiniModal onClose={() => setOpened(false)} alignTop>
          <MiniModal.Header>alignTop</MiniModal.Header>
          <MiniModal.Body>Окно визуально ближе к верху экрана, а не к центру.</MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setOpened(false)}>
              Закрыть
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <div
        style={{ height: 32, background: 'repeating-linear-gradient(0deg, #f0f0f0, #f0f0f0 8px, #fff 8px, #fff 16px)' }}
      />
      <Gapped>
        <Button onClick={() => setOpened(true)}>Открыть (alignTop)</Button>
      </Gapped>
      <div
        style={{
          height: 160,
          background: 'repeating-linear-gradient(0deg, #f5f5f5, #f5f5f5 6px, #fff 6px, #fff 12px)',
        }}
      />
    </div>
  );
};
ExampleRootPropsAlignTop.storyName = 'Окно у верхнего края (alignTop)';

/**
 * По умолчанию фокус не выходит за пределы модалки. `disableFocusLock={true}` отключает это — Tab может
 * увести фокус на элементы вне оверлея. Для сценария: поле ввода находится вне мини-модалки, пока она открыта.
 */
export const ExampleRootPropsDisableFocusLock: Story = () => {
  const [isOpened, setOpened] = React.useState(false);
  return (
    <Gapped vertical>
      {isOpened && (
        <MiniModal onClose={() => setOpened(false)} disableFocusLock>
          <MiniModal.Header>Без focus lock</MiniModal.Header>
          <MiniModal.Body>
            Несколько раз нажмите Tab: фокус сможет перейти на поле &quot;Снаружи&quot; и кнопки под сценой.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setOpened(false)}>
              Закрыть
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Gapped>
        <input
          type="text"
          placeholder="Снаружи: Tab сюда, когда focus lock отключён"
          style={{ width: 360, padding: '6px 8px' }}
        />
        <Button onClick={() => setOpened(true)}>Открыть (disableFocusLock)</Button>
      </Gapped>
    </Gapped>
  );
};
ExampleRootPropsDisableFocusLock.storyName = 'Блокировка фокуса отключена (disableFocusLock)';

/**
 * Проп `theme` на корне объединяется с `ThemeContext` (см. `getMiniModalTheme`), можно точечно
 * задать токены вроде `modalBg`. Проп `width`, переданный на `MiniModal`, подставляется в
 * `Modal` после внутреннего значения по умолчанию **400** — т.е. ширина переопределяется.
 */
export const ExampleRootPropsThemeAndWidth: Story = () => {
  const [isThemeOpened, setThemeOpened] = React.useState(false);
  const [isWidthOpened, setWidthOpened] = React.useState(false);

  return (
    <Gapped>
      {isThemeOpened && (
        <MiniModal onClose={() => setThemeOpened(false)} theme={{ modalBg: '#E3F2FD' }}>
          <MiniModal.Header>Кастомный фон</MiniModal.Header>
          <MiniModal.Body>
            Через theme передан &quot;голубоватый&quot; token modalBg (пример; выберите токены под макет).
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setThemeOpened(false)}>
              Понятно
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      {isWidthOpened && (
        <MiniModal onClose={() => setWidthOpened(false)} width={560}>
          <MiniModal.Header>Шире, чем по умолчанию</MiniModal.Header>
          <MiniModal.Body>
            По умолчанию у мини-модалки 400px; здесь задано width=560, чтобы вместить чуть больше текста в одну строку.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" onClick={() => setWidthOpened(false)}>
              Закрыть
            </Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={() => setThemeOpened(true)}>С темой (modalBg)</Button>
      <Button onClick={() => setWidthOpened(true)}>С width=560</Button>
    </Gapped>
  );
};
ExampleRootPropsThemeAndWidth.storyName = 'Своя тема и ширина окна';
