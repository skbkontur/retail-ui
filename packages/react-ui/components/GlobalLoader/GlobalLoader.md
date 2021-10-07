```jsx harmony
import { GlobalLoader } from './GlobalLoader';

const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);

setTimeout(() => {
  GlobalLoader.start()
}, 5000);

setTimeout(() => {
  GlobalLoader.done();
}, 7000);


<GlobalLoader expectedDownloadTime={2000} downloadSuccess={success} downloadError={error} />
```





