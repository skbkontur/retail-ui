```jsx
const S = 60;

const Block = ({ pos, trigger, top, left }) => (
  <div
    style={{
      top,
      left,
      display: 'inline-block',
      position: 'absolute'
    }}
  >
    <Tooltip render={() => pos} pos={pos} trigger={trigger}>
      <div
        tabIndex={0}
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
  trigger: 'click'
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

  <Block pos="top right" trigger={state.trigger} top={S} left={S * 2} />
  <Block pos="top center" trigger={state.trigger} top={S} left={S * 3} />
  <Block pos="top left" trigger={state.trigger} top={S} left={S * 4} />

  <Block pos="right top" trigger={state.trigger} top={S * 2} left={S * 5} />
  <Block pos="right middle" trigger={state.trigger} top={S * 3} left={S * 5} />
  <Block pos="right bottom" trigger={state.trigger} top={S * 4} left={S * 5} />

  <Block pos="bottom left" trigger={state.trigger} top={S * 5} left={S * 4} />
  <Block pos="bottom center" trigger={state.trigger} top={S * 5} left={S * 3} />
  <Block pos="bottom right" trigger={state.trigger} top={S * 5} left={S * 2} />

  <Block pos="left bottom" trigger={state.trigger} top={S * 4} left={S} />
  <Block pos="left middle" trigger={state.trigger} top={S * 3} left={S} />
  <Block pos="left top" trigger={state.trigger} top={S * 2} left={S} />
</div>;
```
