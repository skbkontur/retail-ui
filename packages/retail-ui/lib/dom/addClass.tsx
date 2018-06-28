export default function addClass(element: HTMLElement, className: string) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    const classes = (element.getAttribute('class') || '').split(/\s+/);
    if (!classes.includes(className)) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }
}
