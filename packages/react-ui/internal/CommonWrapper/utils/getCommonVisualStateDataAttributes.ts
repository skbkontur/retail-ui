import type { VisualStateDataAttributesResultType } from './getVisualStateDataAttributes.js';
import { getVisualStateDataAttributes } from './getVisualStateDataAttributes.js';
import { tryGetBoolean } from './tryGetBoolean.js';

export function getCommonVisualStateDataAttributes(
  componentProps: Record<string, unknown>,
): VisualStateDataAttributesResultType {
  return getVisualStateDataAttributes({
    error: tryGetBoolean(componentProps['error']),
    warning: tryGetBoolean(componentProps['warning']),
  });
}
