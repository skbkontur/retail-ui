const style = {
  padding: 10,
  background: '#f99',
};

ReactDOM.render((
  <div>
    <Sticky side="top">
      <div style={style}>Small loan of a million dollars</div>
    </Sticky>
    <div style={{height: 1000}} />
    <Sticky side="bottom">
      <div style={style}>Make America Great Again</div>
    </Sticky>
    <div style={{height: 100}} />
  </div>
), mountNode);
