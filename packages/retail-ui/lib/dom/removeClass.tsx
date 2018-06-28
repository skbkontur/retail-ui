export default function removeClass(element: HTMLElement, className: string) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    let classes = (element.getAttribute('class') || '').split(/\s+/);
    classes = classes.filter(c => c !== className);
    element.className = classes.join(' ');
  }
}
