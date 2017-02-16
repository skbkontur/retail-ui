var items = ['One', 'Two', 'Three'];

function renderBlock(item) {
  return (
    <div>
      <div style={{ lineHeight: '40px' }}>{item}</div>
      eh
    </div>
  );
}

var blockStyle = {
  borderLeft: '1px solid #ccc',
  marginBottom: 20,
  paddingLeft: 10
};

ReactDOM.render((
  <div>
    <div style={blockStyle}>
      <RadioGroup items={items} />
    </div>
    <div style={blockStyle}>
      <RadioGroup items={items} inline />
    </div>
    <div style={blockStyle}>
      <RadioGroup items={items} renderItem={renderBlock} width="100%" />
    </div>
  </div>
), mountNode);
