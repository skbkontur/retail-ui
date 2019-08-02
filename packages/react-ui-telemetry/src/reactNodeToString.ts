export default function reactNodeToString(element: React.ReactNode & {props?: any}): string {
  if (element == null) {
    return '';
  }

  if (typeof element === 'string') {
    return element;
  }

  if (typeof element === 'number') {
    return String(element);
  }

  if (Array.isArray(element)) {
    return element.map(subElement => reactNodeToString(subElement!)).join('');
  }

  if (element.props && element.props.children) {
    return reactNodeToString(element.props.children);
  }

  return '';
}
