import { getVisualStateDataAttributes, VisualStateDataAttributesResultType } from './getVisualStateDataAttributes';

const tryGetBoolean = (value: unknown): boolean | undefined => (typeof value === 'boolean' ? value : undefined);

export function getCommonVisualStateDataAttributes(
  componentProps: Record<string, unknown>,
): VisualStateDataAttributesResultType {
  return getVisualStateDataAttributes({
    error: tryGetBoolean(componentProps['error']),
    warning: tryGetBoolean(componentProps['warning']),
  });
}
