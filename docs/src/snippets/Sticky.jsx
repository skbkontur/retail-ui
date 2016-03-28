const style = {
  padding: 10,
  background: '#f99',
};

let stop = null;

ReactDOM.render((
  <div>
    <Sticky side="top" getStop={() => stop}>
      <div style={style}>Small loan of a million dollars</div>
    </Sticky>

    <div style={{height: 1000}} />
    <div ref={(el) => stop = el}
      style={{borderTop: '1px solid #000'}}
    />
    <div style={{height: 1000}} />

    <Sticky side="bottom" getStop={() => stop} offset={20}>
      <div style={style}>Make America Great Again</div>
    </Sticky>

    <div style={{height: 100}} />
  </div>
), mountNode);
