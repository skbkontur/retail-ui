Этот компонент обёртка над [Modal](#/Components/Modal/Modal).

`MiniModal` — модальное диалоговое окно, которое предполагает обязательный отклик пользователя по одному из доступных действий.
Закрытие окна по клику на фон или "крестик" не рекомендуется, т.к. у этих действий нет однозначного описания в
отличие от кнопок с названиями, наподобие "Сохранить", "Подтвердить" и т.п.

👉 По макету предполагается, что все кнопки должны быть среднего размера `size = medium`.

### Уведомление

Самый простой вариант использования:

```jsx harmony
import { MiniModal, Button, Gapped } from '@skbkontur/react-ui';
import { MoneyTypeCoinsIcon } from '@skbkontur/icons/MoneyTypeCoinsIcon';

const PayNotifice = () => {

  const [isOpened, setIsOpened] = React.useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  return (
    <>
      {isOpened && (
        <MiniModal>
          <MiniModal.Header>
            Простое уведомление
          </MiniModal.Header>
          <MiniModal.Body>
            Это простое, но достаточное важное уведомление, чтобы его показать в МиниМодалке
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button size="medium" use="primary" onClick={close}>Понятно</Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button use="pay" onClick={open} icon={<MoneyTypeCoinsIcon/>}>Оплата</Button>
    </>
  );
}

<PayNotifice />
```

### Подтверждение

Иногда от пользователя требуется выбрать одно из доступных действий.

Например, подтвердить важное действие или отклонить его:

```jsx harmony
import { MiniModal, Button, Gapped, ThemeContext } from '@skbkontur/react-ui';
import { TrashCanIcon } from '@skbkontur/icons/TrashCanIcon';

const ConfirmDelete = ({ name, handleDelete }) => {
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
          <MiniModal.Header icon={<TrashCanIcon size={64} color={theme.btnDangerBg}/>}>
            Удалить "{name}"?
          </MiniModal.Header>
          <MiniModal.Footer direction="column">
            <Button use="danger" size="medium" onClick={mainAction}>Удалить</Button>
            <Button size="medium" onClick={close}>Отменить</Button>
          </MiniModal.Footer>
        </MiniModal>
      )}
      <Button onClick={open} icon={<TrashCanIcon weight="light"/>}/>
    </>
  );
}

const list = ['Отчёт № 111', 'Отчёт № 222', 'Отчёт № 333'];

<Gapped vertical>
  {list.map((name) => (
    <Gapped key={name}>
      <div style={{ width: 200, borderBottom: 'dashed 1px' }}>
        {name}
      </div>
      <span>
        <ConfirmDelete name={name} handleDelete={() => alert(`${name} удалён`)}/>
      </span>
    </Gapped>
  ))}
</Gapped>
```

### Синглтон

Одно и то же диалоговое окно может вызываться в разных частях приложения.

В таком случае стоит реализовать паттерн синглтона:

```jsx harmony
import { MiniModal, Button, Gapped } from '@skbkontur/react-ui';
import { NotificationBellAlarmIcon16Solid } from '@skbkontur/icons/NotificationBellAlarmIcon16Solid';
import { NotificationBellAlarmIcon64Regular } from '@skbkontur/icons/NotificationBellAlarmIcon64Regular';

const EnableNotification = React.forwardRef(({ setStatus }, ref) => {
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

  return isOpened && (
    <MiniModal>
      <MiniModal.Header icon={<NotificationBellAlarmIcon64Regular/>}>
        Разрешить уведомления?
      </MiniModal.Header>
      <MiniModal.Footer direction="column">
        <Button use="primary" size="medium" onClick={handleAllowAll}>Разрешить все</Button>
        <Button size="medium" onClick={handleAllowBasic}>Разрешить только основные</Button>
        <MiniModal.Indent/>
        <Button size="medium" onClick={handleDenyAll}>Запретить</Button>
      </MiniModal.Footer>
    </MiniModal>
  );
});

const [status, setStatus] = React.useState('-не выбрано-');

const NotificationEnableRef = React.useRef(null);

const NotificationEnableOpen = () => NotificationEnableRef.current && NotificationEnableRef.current.open();

<>
  <EnableNotification ref={NotificationEnableRef} setStatus={setStatus}/>
  <Gapped vertical>
    <span>
      <NotificationBellAlarmIcon16Solid/> Статус уведомлений: {status}
    </span>
    <Button use="text" theme={{ btnTextBg: '#D6D6D6' }} onClick={NotificationEnableOpen}>Разрешить уведомления?</Button>
    <Button use="text" theme={{ btnTextBg: '#E6E6E6' }} onClick={NotificationEnableOpen}>Разрешить уведомления?</Button>
    <Button use="text" theme={{ btnTextBg: '#F0F0F0' }} onClick={NotificationEnableOpen}>Разрешить уведомления?</Button>
  </Gapped>
</>
```

### Ожидание

Некоторые действия для корректного исполнения требуют блокировки других действий пользователя.

В таких случаях можно, например, использовать проп `loading` для `Button`, и не позволять закрыть окно до конца исполнения:

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

const WaitingUpdate = ({ handleUpdate, setLastUpdated }) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  const handleMainClick = () => {
    setIsLoading(true);
    handleUpdate()
      .then(() => {
        setIsLoading(false);
        setIsOpened(false);
        setLastUpdated(new Date());
      });
  };

  return (
    <>
      {isOpened && (
        <MiniModal>
          <MiniModal.Header>
            Обновить?
          </MiniModal.Header>
          <MiniModal.Body>
            После вашего подтверждения другие действия на странице будут заблокированы на несколько секунд.
          </MiniModal.Body>
          <MiniModal.Footer>
            <Button use="success" size="medium" onClick={handleMainClick} loading={isLoading}>Обновить</Button>
            <Button size="medium" onClick={close} disabled={isLoading}>Отменить</Button>
          </MiniModal.Footer>

        </MiniModal>
      )}
      <Button onClick={open} use="success">Обновить</Button>
    </>
  );
}

const dateTimeFormat = new Intl.DateTimeFormat('nu', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const [lastUpdated, setLastUpdated] = React.useState(new Date());

const handleUpdate = () => new Promise((resolve) => setTimeout(resolve, 1500));

<Gapped>
  <WaitingUpdate handleUpdate={handleUpdate} setLastUpdated={setLastUpdated} />
  <span>
    Последнее обновление: {dateTimeFormat.format(lastUpdated)}
  </span>
</Gapped>
```
