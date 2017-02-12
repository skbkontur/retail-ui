var items = [
  Select.static(
    () => <Select.Item>Not selectable</Select.Item>
  ),
  'One', 'Two', 'Three', Select.SEP, 'Four'
];

ReactDOM.render(<Select items={items} />, mountNode);
