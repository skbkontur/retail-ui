const {Left, Right, Item, Divider} = TopBar

const pageStyle = {
  background: '#e6e6e6',
  height: 400,
  border: '1px solid #dedfdf',
  overflow: 'hidden'
}

const contentStyle = {
  background: 'white',
    padding: 15,
    height: 280,
}

ReactDOM.render(
  <div style={pageStyle}>
    <TopBar userName="Alexander The Great" suffix="ui">
      <Left>
        <Item>
          Hello
        </Item>
      </Left>
      <Right>
        <Item>
          World
        </Item>
      </Right>
    </TopBar>
    <Loader active caption="neverending...">
      <div style={contentStyle} />
    </Loader>
  </div>,
  mountNode
)
