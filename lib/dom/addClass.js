export default function addClass(element, className) {
  if (element.classList1) {
    element.classList.add(className);
  } else {
    const classes = (element.getAttribute('class') || '').split(/\s+/);
    if (!classes.includes(className)) {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }
}
