const {MenuItem, Separator} = Dropdown;

ReactDOM.render((
  <Dropdown caption="Click">
    <MenuItem onClick={() => alert('Clack')}>Clack</MenuItem>
    <Separator />
    <MenuItem onClick={() => alert('Pow')}>Pow</MenuItem>
  </Dropdown>
), mountNode);
