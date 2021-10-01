```jsx harmony
const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);

setTimeout(()=>{
  setError(true)
}, 20000);

setTimeout(()=>{
  setSuccess(true)
}, 40000);

<GlobalLoader expectedDownloadTime={2000} downloadSuccess={success} downloadError={error}/>
```
