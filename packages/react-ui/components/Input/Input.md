Разные типы

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
const handler = console.log;
<Gapped vertical>
  text <Input type="text" onValueChange={handler} />
  password <Input type="password" onValueChange={handler} />
  number <Input type="number" onValueChange={handler} />
  color <Input type="color" onValueChange={handler} />
  date <Input type="date" onValueChange={handler} />
  email <Input type="email" onValueChange={handler} />
  month <Input type="month" onValueChange={handler} />
  search <Input type="search" onValueChange={handler} />
  tel <Input type="tel" onValueChange={handler} />
  time <Input type="time" onValueChange={handler} />
  url <Input type="url" onValueChange={handler} />
  week <Input type="week" onValueChange={handler} />
</Gapped>;
```
