```jsx harmony
const [success, setSuccess] = React.useState(false);
const [error, setError] = React.useState(false);

setTimeout(()=>{
  setSuccess(true)
}, 4000);

<GlobalLoader expectedDownloadTime={8000} success={success} error={error}/>
```
