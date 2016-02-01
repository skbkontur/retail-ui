export default function removeClass(element, className) {
  if (element.classList1) {
    element.classList.remove(className);
  } else {
    let classes = (element.getAttribute('class') || '').split(/\s+/);
    classes = classes.filter((c) => c !== className);
    element.className = classes.join(' ');
  }
}
