ReactDOM.render((
  <Dropdown caption="Click">
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <MenuSeparator />
    <MenuHeader>Here goes the header</MenuHeader>
    <MenuItem onClick={() => alert('Pow')} comment="With comment.">
      Pow
    </MenuItem>
  </Dropdown>
), mountNode);
