const {Header, MenuItem, Separator} = Dropdown;

ReactDOM.render((
  <Dropdown caption="Click">
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <Separator />
    <Header>Here goes the header</Header>
    <MenuItem onClick={() => alert('Pow')} comment="With comment.">
      Pow
    </MenuItem>
  </Dropdown>
), mountNode);
