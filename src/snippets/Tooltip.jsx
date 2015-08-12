function render() {
  return <div>Hey there!</div>;
}

React.render(<div>
  <Tooltip render={render} pos="top right">top right</Tooltip>
  <br /><br />
  <Tooltip render={render} pos="top center" trigger="click">top center</Tooltip>
  <br /><br />
  <Tooltip render={render} pos="bottom left">bottom left</Tooltip>
  <br /><br />
  <Tooltip render={render} pos="right top">right top</Tooltip>
  <br /><br />
  <Tooltip render={render} pos="right middle">right middle</Tooltip>
  <br /><br />
  <Tooltip render={render}>
    <span style={{border: '1px solid'}}>?</span>
  </Tooltip>
</div>, mountNode);
