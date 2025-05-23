### Базовый пример

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

### Размер

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

### Кебаб-меню с выпадашкой слева

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

### Кастомное действие при открытии

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

### Иконка и автовыравнивание

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, Kebab } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';

<Kebab>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
  <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</Kebab>;
```

### Иконка и отключенное автовыравнивание

```jsx harmony
import { Button, MenuHeader, MenuItem, MenuSeparator, Kebab } from '@skbkontur/react-ui';
import OkIcon from '@skbkontur/react-icons/Ok';

<Kebab preventIconsOffset>
  <MenuHeader>MenuHeader</MenuHeader>
  <MenuItem icon={<OkIcon />}>MenuItem1</MenuItem>
  <MenuItem icon={<OkIcon />}>MenuItem2</MenuItem>
  <MenuItem>MenuItem3</MenuItem>
</Kebab>
```

### Отключенное кебаб-меню

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

### Отключенная анимация

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

### Высота

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
