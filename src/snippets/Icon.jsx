React.render(
  <div>
    <div>Имя показывается при наведении:</div>
    {Icon.getAllNames().map(name => (
      <span key={name} title={name} style={{margin: 5}}>
        <Icon name={name} />{' '}
      </span>
    ))}
  </div>,
  mountNode
);
