### Использование

Рекомендуемое

```jsx harmony
import { Loader, Logotype, TopBar } from '@skbkontur/react-ui';
import BabyIcon from '@skbkontur/react-icons/Baby';

let pageStyle = {
  background: '#e6e6e6',
  height: 400,
  border: '1px solid #dedfdf',
  overflow: 'hidden',
};

let contentStyle = {
  background: 'white',
  padding: 15,
  height: 280,
};

<div style={pageStyle}>
  <TopBar>
    <TopBar.Start>
      <TopBar.ItemStatic>
        <Logotype suffix="ui" withWidget />
      </TopBar.ItemStatic>
      <TopBar.Item>
        <BabyIcon color="#666" />
      </TopBar.Item>
      <TopBar.Item>
        <BabyIcon color="#666" />
      </TopBar.Item>
    </TopBar.Start>
    <TopBar.End>
      <TopBar.Item>
        <BabyIcon color="#666" />
      </TopBar.Item>
      <TopBar.User userName="Alexander The Great" />
      <TopBar.Divider />
      <TopBar.Logout onClick={() => alert('Logout!')} />
    </TopBar.End>
  </TopBar>
  <Loader active caption="neverending...">
    <div style={contentStyle} />
  </Loader>
</div>;
```

Старый вариант. (Продуктовый виджет работает только у первого Logotype на странице)

```jsx harmony
import { Loader, TopBar } from '@skbkontur/react-ui';
import BabyIcon from '@skbkontur/react-icons/Baby';

let Item = TopBar.Item;

let pageStyle = {
  background: '#e6e6e6',
  height: 400,
  border: '1px solid #dedfdf',
  overflow: 'hidden',
};

let contentStyle = {
  background: 'white',
  padding: 15,
  height: 280,
};

<div style={pageStyle}>
  <TopBar
    userName="Alexander The Great"
    suffix="ui"
    onLogout={() => alert('Logout!')}
    leftItems={[
      <Item>
        <BabyIcon color="#666" />
      </Item>,
    ]}
  />
  <Loader active caption="neverending...">
    <div style={contentStyle} />
  </Loader>
</div>;
```

#### Локали по умолчанию (см. `LocaleProvider`)

```typescript static
interface TopBarLocale {
  logout?: string;
  cabinetSettings?: string;
  cabinetCertificates?: string;
  cabinetServices?: string;
}

const ru_RU = {
  cabinetSettings: 'Личный кабинет Контура',
  cabinetCertificates: 'Сертификаты',
  cabinetServices: 'Оплата сервисов',
  logout: 'Выйти',
};

const en_GB = {
  cabinetSettings: 'Personal account Kontur',
  cabinetCertificates: 'Certificates',
  cabinetServices: 'Payment for services',
  logout: 'Logout',
};
```
