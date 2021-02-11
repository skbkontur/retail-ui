To render rubles

```jsx
<CurrencyLabel value={12356.1} currencySymbol={'₽'} />
```

...or dollars

```jsx
<CurrencyLabel value={12356.1} currencySymbol={'$'} />
```

...or nothing

```jsx
<CurrencyLabel value={12356.1} />
```

Count of fraction digits can be changed

```jsx
<CurrencyLabel value={3562001.1} fractionDigits={3} currencySymbol={'₽'} />
```
