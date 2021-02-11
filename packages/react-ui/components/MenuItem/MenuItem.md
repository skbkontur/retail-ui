```jsx harmony
import { Link } from '@skbkontur/react-ui';

<MenuItem href="http://tech.skbkontur.ru/react-ui/" component={({ href, ...rest }) => <Link to={href} {...rest} />}>
  Awesome link
</MenuItem>;
```
