const {Left, Right, Item, Divider, Logo, ButtonItem} = TopBar

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
    <TopBar>
      <Left>
        <Logo suffix="ui" color="#0097A7"/>
        <Divider />
        <ButtonItem iconOnly>
          <Icon color="#aaa" size={20} name="angle-bottom"/>
        </ButtonItem>
      </Left>
      <Right>
        <Item>
          <Icon color="#666" name="user" /> Alexander The Great
        </Item>
        <Divider />
        <ButtonItem onClick={() => alert('Logout')}>
          Logout
        </ButtonItem>
      </Right>
    </TopBar>
    <Loader active caption="neverending...">
      <div style={contentStyle} />
    </Loader>
  </div>,
mountNode
)