```js
const { default: Button } = require("../Button");

function showComplexNotification() {
  Toast.push("Successfully saved", {
    label: "Cancel",
    handler: () => Toast.push("Canceled")
  });
}

<Button onClick={showComplexNotification}>Show notification</Button>;
```
