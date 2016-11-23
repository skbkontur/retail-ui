ReactDOM.render(
  <Toast action={{label: 'Cancel', handler: () => console.log('cancel')}}>
    Successfuly send
  </Toast>,
  mountNode
);
