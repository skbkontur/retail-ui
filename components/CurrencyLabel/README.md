To render rubbles

```js
<CurrencyLabel value={12356.1} />
```

...or dollars

```js
<CurrencyLabel value={12356.1} currencySymbol={"$"} />
```

...or nothing

```js
<CurrencyLabel value={12356.1} currencySymbol={null} />
```

Count of fraction digits can be changed

```js
<CurrencyLabel value={3562001.1} fractionDigits={3} />
```
