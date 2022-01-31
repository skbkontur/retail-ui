import { HorizontalItemProps } from './HorizontalItem';

export const calcItemMarginLeft = (
  gap: HorizontalItemProps['gap'],
  wrap: HorizontalItemProps['wrap'],
  isFirst: HorizontalItemProps['isFirst'],
) => {
  if (!isFirst || wrap) {
    return gap;
  }

  return 0;
};
