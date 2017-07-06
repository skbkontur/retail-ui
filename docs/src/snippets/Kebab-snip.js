var style = {
  alignItems: 'center',
  background: 'white',
  border: '1px solid #dfdede',
  color: '#333',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 20px',
  width: 250
};

var Card = ({ name, post }) =>
  <div style={style}>
    <div>
      <h3>{name}</h3>
      <p style={{ color: 'gray' }}>{post}</p>
    </div>

    <Kebab size="large">
      <MenuItem icon="edit" onClick={() => Toast.push('Nope')}>
        Редактировать
      </MenuItem>
      <MenuItem icon="trash" onClick={() => Toast.push('Nope')}>
        Удалить
      </MenuItem>
    </Kebab>
  </div>;

ReactDOM.render(
  <Gapped gap={-1}>
    <Gapped gap={-1}>
      <Card name="Баранова Анастасия" post="SEO GazPro" />
      <Card name="Слуцкий Антон" post="Junior Front-Back Developer" />
    </Gapped>
    <Gapped gap={-1}>
      <Card name="Иванов Иван" post="Head Ivan Co" />
      <Card name="Сашка Егоров" post="KungFu Master" />
    </Gapped>
  </Gapped>,
  mountNode
);
