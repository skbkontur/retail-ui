var style = {display: 'inline-block', margin: '10px 10px 0 0'};
React.render(
  <div>
    <div>Имя показывается при наведении:</div>
    {Icon.getAllNames().map(name => (
      <span key={name} title={name} style={style}>
        <Icon name={name} />{' '}
      </span>
    ))}
  </div>,
  mountNode
);
