```jsx
const S = 60;

const render = pos => (
  <Tooltip
    children={pos}
    pos={pos}
    render={() => render(pos)}
    trigger={state.trigger === 'opened' ? 'hover' : state.trigger}
  />
);

const Block = ({ pos, trigger, top, left, onMouseDown }) => (
  <div
    style={{
      top,
      left,
      display: 'inline-block',
      position: 'absolute',
      cursor: trigger === 'click' ? 'pointer' : 'default'
    }}
  >
    <Tooltip render={() => render(pos)} pos={pos} trigger={trigger}>
      <div
        tabIndex={trigger === 'focus' ? 0 : null}
        style={{
          height: S - 5,
          width: S - 5,
          background: 'white',
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
        }}
      />
    </Tooltip>
  </div>
);

let initialState = {
  trigger: 'click',
  blocks: [
    { top: S, left: S * 2, pos: 'top right' },
    { top: S, left: S * 3, pos: 'top center' },
    { top: S, left: S * 4, pos: 'top left' },
    { top: S * 2, left: S * 5, pos: 'right top' },
    { top: S * 3, left: S * 5, pos: 'right middle' },
    { top: S * 4, left: S * 5, pos: 'right bottom' },
    { top: S * 5, left: S * 4, pos: 'bottom left' },
    { top: S * 5, left: S * 3, pos: 'bottom center' },
    { top: S * 5, left: S * 2, pos: 'bottom right' },
    { top: S * 4, left: S, pos: 'left bottom' },
    { top: S * 3, left: S, pos: 'left middle' },
    { top: S * 2, left: S, pos: 'left top' }
  ]
};

<div
  style={{
    width: S * 7,
    height: S * 7,
    position: 'relative',
    border: '1px solid #dfdede',
    background: `repeating-linear-gradient(
                   45deg,
                   #fafafa,
                   #fafafa ${S / 4}px,
                   #dfdede ${S / 4}px,
                   #dfdede ${S / 2}px
                 )`
  }}
>
  <Center>
    <Select
      width={S * 2}
      value={state.trigger}
      items={['click', 'hover', 'focus', 'opened', 'closed']}
      onChange={(_, v) => setState({ trigger: v })}
    />
  </Center>

  {state.blocks.map((block, i) => (
    <Block key={i} {...block} trigger={state.trigger} />
  ))}
</div>;
```
