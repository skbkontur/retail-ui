Базовый пример поля ввода.

```jsx harmony
import SearchIcon from '@skbkontur/react-icons/Search';

<Input />;
```

Пример полей ввода в различных состояниях.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Input warning value="Предупреждение" />
  <Input error value="Ошибка" />
</Gapped>
```

Пример полей ввода различных размеров.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Input size="small" placeholder="Маленькое поле ввода" />
  <Input size="medium" placeholder="Среднее поле ввода" />
  <Input width={250} size="large" placeholder="Большое поле ввода" />
</Gapped>
```

Пример полей ввода с иконами.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
import SearchIcon from '@skbkontur/react-icons/Search';

<Gapped>
  <Input value="Иконка слева" leftIcon={<SearchIcon />} />
  <Input value="Иконка справа" rightIcon={<SearchIcon />} />
</Gapped>
```

Пример полей ввода с префиксом и суффиксом.

```jsx harmony
import { Gapped } from '@skbkontur/react-ui';
import SearchIcon from '@skbkontur/react-icons/Search';

<Gapped>
<Input
  width={250}
  prefix="с префиксом\xA0"
  value="найдется всё!"
  rightIcon={<SearchIcon />}
  />
  <Input
  width={250}
  suffix="с суффиксом"
  value="и даже больше"
  leftIcon={<SearchIcon />}
  />
</Gapped>
```

Пример полей ввода с масками.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<div>
  <div>
    <p>Маска показывается только при фокусе.</p>
    <Input mask="8-99-9-999-999" placeholder="Введите номер телефона"/>
  </div>
  <div>
    <p>Маска показывается всегда.</p>
    <Input mask="8-99-9-999-999" alwaysShowMask />
  </div>
</div>
```

Пример различных типов полей ввода.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Gapped>
  <Input width={250} type="text" placeholder="Текстовое поле (по умолчанию)" />
  <Input type="password" placeholder="Поле для ввода пароля"/>
</Gapped>
```

Пример поля ввода с выделением текста при фокусе.
```jsx harmony
import { Gapped } from '@skbkontur/react-ui';

<Input selectAllOnFocus value="Текст выделится при фокусе"/>
```
