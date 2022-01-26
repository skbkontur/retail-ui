import { CheckboxState } from './Checkbox';

export const useIndeterminate = (
  inputRef: React.RefObject<HTMLInputElement>,
  setIsIndeterminate: React.Dispatch<React.SetStateAction<CheckboxState['isIndeterminate']>>,
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
