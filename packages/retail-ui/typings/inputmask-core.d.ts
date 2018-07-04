declare module 'inputmask-core' {
  interface Selection {
    start: number;
    end: number;
  }

  interface Options {
    pattern: string;
    value?: string;
    placeholderChar?: string;
    formatCharacters?: any;
    selecton?: Selection;
    isRevealingMask?: boolean;
  }

  interface Pattern {
    isEditableIndex: (index: number) => boolean;
    isValidAtIndex: (char: string, index: number) => boolean;
    firstEditableIndex: number;
    lastEditableIndex: number;
    isRevealingMask: boolean;
  }

  class InputMask {
    constructor(options: Options);

    pattern: Pattern;
    emptyValue: string;

    input(character: string): boolean;
    backspace(): boolean;
    paste(input: string): boolean;
    setValue(value: string): void;
    getValue(): string;
    getRawValue(): string;
  }

  export default InputMask;
}
