```jsx
let initialState = { checked: false };

<Checkbox checked={state.checked} onChange={(_, v) => setState({ checked: v })}>
  Checkbox
</Checkbox>;
```

Чекбокс может быть в состоянии "частично выбран". Как и в браузерном чекбоксе, это состояние влияет только на внешний вид и не влияет на состояние `checked`. `indeterminate` устанавливается в конструкторе через проп `initialIndeterminate` или методами инстанса `setIndeterminate()`/`resetIndeterminate()`

```jsx
class IndeterminateExample extends React.Component {
  constructor(props) {
    super(props);

    this.checkboxInstance = null;

    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <div>
        <Gapped>
          <Checkbox
            initialIndeterminate
            checked={this.state.checked}
            onChange={(_, v) => this.setState({ checked: v })}
            ref={element => {
              this.checkboxInstance = element;
            }}
          >
            Checkbox
          </Checkbox>
          <Button onClick={this.handleClickOnSetIndeterminate.bind(this)}>
            <code>setIndeterminate()</code>
          </Button>
          <Button onClick={this.handleClickOnResetIndeterminate.bind(this)}>
            <code>resetIndeterminate()</code>
          </Button>
        </Gapped>
      </div>
    );
  }

  handleClickOnSetIndeterminate() {
    if (this.checkboxInstance) {
      this.checkboxInstance.setIndeterminate();
    }
  }
  handleClickOnResetIndeterminate() {
    if (this.checkboxInstance) {
      this.checkboxInstance.resetIndeterminate();
    }
  }
}

<IndeterminateExample />;
```
