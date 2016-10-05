ReactDOM.render(
  <Gapped vertical>
    <div>Имя показывается при наведении:</div>
    <Gapped>
      {Icon.getAllNames().map((name) => (
        <Tooltip key={name} render={() => name}>
          <Icon name={name} />
        </Tooltip>
      ))}
    </Gapped>
  </Gapped>,
  mountNode
);
