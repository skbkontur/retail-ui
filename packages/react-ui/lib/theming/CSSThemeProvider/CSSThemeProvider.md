Для использования переменных темы через css custom properties есть компонент CSSThemeProvider.

Механизм работы: из темы в текущем контексте (ThemeContext), или из переданной через `props.value`, берутся все существующие переменные, и объявляются как css custom properties, которые доступны всем `children` компонента, так как это наследуемые свойства.

Использование переменной из темы для указания цвета фона элемента:
```jsx static
const myTheme = ThemeFactory.create({
  bgDefault: 'red',
}, DEFAULT_THEME);

<CSSThemeProvider value={myTheme}>
  <div style={{
    width: 100,
    height: 100,
    backgroundColor: 'var(--bg-default)',
  }}>
</CSSThemeProvider>
```

Ещё есть компонент CSSThemeProvider.Global, который так же объявляет переменные в css, но делает это глобально, то есть для селектора `:root`.

```jsx static
const myTheme = ThemeFactory.create({
  bgDefault: 'red',
}, DEFAULT_THEME);

<CSSThemeProvider.Global value={myTheme} />
<div style={{
  width: 100,
  height: 100,
  backgroundColor: 'var(--bg-default)',
}}>
```
