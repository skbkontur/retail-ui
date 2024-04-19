import { getVisualStateDataAttributes, VisualStateDataAttributesResultType } from './getVisualStateDataAttributes';

export function getCommonVisualStateDataAttributes(
  componentProps: Record<string, unknown>,
): VisualStateDataAttributesResultType {
  return getVisualStateDataAttributes({
    error: componentProps['error'],
    warning: componentProps['warning'],
  });
}
