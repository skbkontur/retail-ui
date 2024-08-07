import { getVisualStateDataAttributes, VisualStateDataAttributesResultType } from './getVisualStateDataAttributes';
import { tryGetBoolean } from './tryGetBoolean';

export function getCommonVisualStateDataAttributes(
  componentProps: Record<string, unknown>,
): VisualStateDataAttributesResultType {
  return getVisualStateDataAttributes({
    error: tryGetBoolean(componentProps['error']),
    warning: tryGetBoolean(componentProps['warning']),
  });
}
