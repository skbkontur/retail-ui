import events from 'add-event-listener';

const handlers = [];

events.addEventListener(document.body, 'focusin', (event) => {
  const target = event.target || event.srcElement;
  handlers.forEach((handler) => {
    for (const element of handler.elements) {
      if (element.contains(target)) {
        return;
      }
    }
    handler.callback();
  });
});

function listen(elements, callback) {
  const handler = {
    elements,
    callback,
  };
  handlers.push(handler);

  return {
    remove() {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    },
  };
}

export default listen;
