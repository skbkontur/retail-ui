var Item = TopBar.Item;

var pageStyle = {
  background: '#e6e6e6',
  height: 400,
  border: '1px solid #dedfdf',
  overflow: 'hidden'
};

var contentStyle = {
  background: 'white',
  padding: 15,
  height: 280
};

ReactDOM.render(
  <div style={pageStyle}>
    <TopBar
      userName="Alexander The Great"
      suffix="ui"
      onLogout={() => alert('Logout!')}

      leftItems={[
        <Item>
          <Icon name="child" color="#666"/>
        </Item>
      ]}
    />
    <Loader active caption="neverending...">
      <div style={contentStyle} />
    </Loader>
  </div>,
  mountNode
);
