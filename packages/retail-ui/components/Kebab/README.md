```jsx
const EditIcon = require('@skbkontur/react-icons/Edit').default;
const TrashIcon = require('@skbkontur/react-icons/Trash').default;

let style = {
  alignItems: 'center',
  background: 'white',
  border: '1px solid #dfdede',
  color: '#333',
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
      <MenuItem icon={<EditIcon />} onClick={() => Toast.push('Nope')}>
        Редактировать
      </MenuItem>
      <MenuItem icon={<TrashIcon />} onClick={() => Toast.push('Nope')}>
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
