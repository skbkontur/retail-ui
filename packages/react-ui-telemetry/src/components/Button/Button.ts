import { ButtonProps } from 'retail-ui/build/components/Button';
import ConverterProps from '../../ConverterProps';
import { MetrikaVariables } from '../../metrikaTypes';
import reactNodeToString from '../../reactNodeToString';

export function Button(props: ButtonProps): MetrikaVariables {
  return new ConverterProps<ButtonProps>(props)
    .customConvertProp('icon', icon => {
      return icon && icon.type && icon.type.name ? { value: icon.type.name } : null;
    })
    .customConvertProp('children', children => ({
      value: ConverterProps.substitutionString(reactNodeToString(children)),
    }))
    .getConvertedProps();
}
