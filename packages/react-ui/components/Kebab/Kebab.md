Базовый пример кебаб-меню.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { Gapped, MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

let Card = ({ name, post }) => (
  <div style={style}>
    <div>
      <h3>{name}</h3>
      <p style={{ color: 'gray' }}>{post}</p>
    </div>

    <Kebab size="large">
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Gapped gap={-1} wrap>
  <Gapped gap={-1}>
    <Card name="Баранова Анастасия" post="SEO GazPro" />
    <Card name="Слуцкий Антон" post="Junior Front-Back Developer" />
  </Gapped>
  <Gapped gap={-1}>
    <Card name="Иванов Иван" post="Head Ivan Co" />
    <Card name="Сашка Егоров" post="KungFu Master" />
  </Gapped>
</Gapped>;
```

Различные размеры кебаб-меню.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { Gapped, MenuItem, Toast} from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 230,
};

let Card = ({ title, size }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab size={size}>
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Gapped>
  <Card title="Маленький кебаб" size="small" />
  <Card title="Средний кебаб" size="medium" />
  <Card title="Большой кебаб" size="large" />
</Gapped>
```

Кебаб-меню с выпадашкой слева.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};


let Card = ({ title }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab positions={['left middle']} size="large">
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Card title="С выпадашкой слева" />
```

С кастомным действием при открытии.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

let Card = ({ title }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab
      onOpen={() => Toast.push('Кебаб-меню открылось!')}
      size="large"
      >
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Card title="С кастомным действием" />
```

Отключенное кебаб-меню.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

let Card = ({ title }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab disabled size="large">
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Card title="Не нажимается :(" />
```

Кебаб-меню с отключенной анимацией.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

let Card = ({ title }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab disableAnimations size="large">
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Отредактировано')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Удалено')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>
);

<Card title="Без анимации" />
```

Кебаб-меню с заданной высотой.

```jsx harmony
import EditIcon from '@skbkontur/react-icons/Edit';
import TrashIcon from '@skbkontur/react-icons/Trash';
import { MenuItem, Toast } from '@skbkontur/react-ui';

let style = {
  alignItems: 'center',
  border: '1px solid #dfdede',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250,
};

let Card = ({ title }) => (
  <div style={style}>
    <div>
      <h3>{title}</h3>
    </div>

    <Kebab
      menuMaxHeight="100px"
      size="large"
      >
      <MenuItem>
        Действие
      </MenuItem>
      <MenuItem>
        И ещё одно
      </MenuItem>
      <MenuItem>
        Ещё действие
      </MenuItem>
      <MenuItem>
        И последнее действие
      </MenuItem>
    </Kebab>
  </div>
);

<Card title="С заданной высотой" />
```
