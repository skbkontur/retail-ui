Этот компонент обёртка над [Modal](#/Components/Modal/Modal).

`MiniModal` — модальное диалоговое окно, которое предполагает обязательный отклик пользователя по одному из доступных действий.
Закрытие окна по клику на фон или "крестик" не рекомендуется, т.к. у этих действий нет однозначного описания как у кнопок.

👉 Предполагается, что все кнопки будут среднего размера `size = medium`. Текущее АПИ никак не модифицирует пропы `btnMain`, `btnAlt` и `btnCancel`, поэтому этот момент придётся отслеживать самостоятельно.

Пример простого уведомления:

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { MoneyTypeCoinsIcon } from '@skbkontur/icons/MoneyTypeCoinsIcon';

const PayNotifice = () => {

  const [isOpened, setIsOpened] = React.useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  return (
    <>
      {isOpened && <MiniModal
        title="Простое уведомление"
        description="Это простое, но достаточное важное уведомление, чтобы его показать в МиниМодалке"
        btnMain={<Button size="medium" use="primary" onClick={close}>Понятно</Button>}
      />}
      <Button use="pay" onClick={open} icon={<MoneyTypeCoinsIcon />}>Оплата</Button>
    </>
  );
}

<PayNotifice />
```

Пример с дополнительным подтверждением от пользователя:

```jsx harmony
import { Button, Gapped, ThemeContext } from '@skbkontur/react-ui';
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
      {isOpened && <MiniModal
        icon={<TrashCanIcon size={64} color={theme.btnDangerBg} />}
        title={`Удалить "${name}"?`}
        btnMain={<Button use="danger" size="medium" onClick={mainAction}>Удалить</Button>}
        btnCancel={<Button size="medium" onClick={close}>Отменить</Button>}
        direction="column"
      />}
      <Button onClick={open} icon={<TrashCanIcon weight="light" />} />
    </>
  );
}

const list = ['Отчёт № 111', 'Отчёт № 222', 'Отчёт № 333'];

<Gapped vertical>
  {list.map((name) => (
    <Gapped>
      <div style={{ width: 200, borderBottom: 'dashed 1px' }}>
        {name}
      </div>
      <span>
        <ConfirmDelete name={name} handleDelete={() => alert(`${name} удалён`)} />
      </span>
    </Gapped>
  ))}
</Gapped>
```

Одно и то же диалоговое окно может вызываться в разных частях приложения.

В таком случае стоит реализовать паттерн синглтона:

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';
import { NotificationBellAlarmIcon } from '@skbkontur/icons/NotificationBellAlarmIcon';

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
    <MiniModal
      icon={<NotificationBellAlarmIcon size={64} />}
      title="Разрешить уведомления?"
      btnMain={<Button use="primary" size="medium" onClick={handleAllowAll}>Разрешить все</Button>}
      btnAlt={<Button size="medium" onClick={handleAllowBasic}>Разрешить только основные</Button>}
      btnCancel={<Button size="medium" onClick={handleDenyAll}>Запретить</Button>}
      hasCancelIndent
    />
  );
});

const [status, setStatus] = React.useState();

const NotificationEnableRef = React.useRef(null);

const NotificationEnableOpen = () => NotificationEnableRef.current && NotificationEnableRef.current.open();

<Gapped vertical>
  <span>
    <EnableNotification ref={NotificationEnableRef} setStatus={setStatus} />
    Статус уведомлений: {status}
  </span>
  <Button onClick={NotificationEnableOpen}>Разрешить уведомления? 1</Button>
  <Button onClick={NotificationEnableOpen}>Разрешить уведомления? 2</Button>
  <Button onClick={NotificationEnableOpen}>Разрешить уведомления? 3</Button>
</Gapped>
```

Некоторые действия для корректного исполнения требуют изолированности.
В таких случаях можно, например, использовать проп `loading` для `Button`, и не позволять закрыть окно до конца исполнения:

```jsx harmony
import { Button, Gapped } from '@skbkontur/react-ui';

const WaitingUpdate = ({ handleSave, setLastUpdated }) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);

  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  const handleMainClick = () => {
    setIsLoading(true);
    handleSave()
      .then(() => {
        setIsLoading(false);
        setIsOpened(false);
        setLastUpdated(new Date());
      });
  };

  return (
    <>
      {isOpened && <MiniModal
        title="Обновить?"
        btnMain={<Button use="success" size="medium" onClick={handleMainClick} loading={isLoading}>Обновить</Button>}
        btnCancel={<Button size="medium" onClick={close} disabled={isLoading}>Отменить</Button>}
      />}
      <Button onClick={open} use="success">Обновить</Button>
    </>
  );
}

const dateTimeFormat = new Intl.DateTimeFormat('nu', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const [lastUpdated, setLastUpdated] = React.useState(new Date());

const handleSave = () => new Promise((resolve) => {
  setTimeout(resolve, 1500);
});

<Gapped>
  <WaitingUpdate handleSave={handleSave} setLastUpdated={setLastUpdated} />
  <span>
    Последнее обновление: {dateTimeFormat.format(lastUpdated)}
  </span>
</Gapped>
```
