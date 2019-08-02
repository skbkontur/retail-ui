import { InputProps } from './Input';

const substitutionString = (key: string, value?: string): {[key: string]: string } | {} => {
  if (value === undefined) {
    return {};
  }
  let str = '';
  while (str.length < value.length) {
    str += Math.random().toString(36).substring(2, 12);
  }
  return {
    key: str.substring(0, value.length)
  };
};

export function f(props: InputProps): any {

  return {
    ...props,
    ...substitutionString('value', props.value),
  }
}
