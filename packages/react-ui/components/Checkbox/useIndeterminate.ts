import { CheckboxRef, CheckboxState } from './Checkbox';

export const useIndeterminate = (
  inputRef: CheckboxRef['inputRef'],
  setIsIndeterminate: CheckboxState['setIsIndeterminate'],
) => {
  /**
   * Устанавливает чекбокс в HTML-состояние `indeterminate`.
   * @public
   */
  const setIndeterminate = () => {
    setIsIndeterminate(true);

    if (inputRef.current) {
      inputRef.current.indeterminate = true;
    }
  };

  /**
   * Снимает с чекбокса HTML-состояние `indeterminate`.
   * @public
   */
  const resetIndeterminate = () => {
    setIsIndeterminate(false);

    if (inputRef.current) {
      inputRef.current.indeterminate = false;
    }
  };

  return { setIndeterminate, resetIndeterminate };
};
