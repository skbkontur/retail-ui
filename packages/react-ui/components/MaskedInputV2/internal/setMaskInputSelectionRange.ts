import { selectionAllowedTypes, type InputType } from '../../Input/Input.js';

function normalizeInputType(type: string): InputType {
  return type.trim() as InputType;
}

export function isMaskInputSelectionAllowed(input: HTMLInputElement): boolean {
  return selectionAllowedTypes.includes(normalizeInputType(input.type || 'text'));
}

export function setMaskInputSelectionRange(
  input: HTMLInputElement | null | undefined,
  start: number,
  end: number = start,
  direction?: 'forward' | 'backward' | 'none',
): void {
  if (!input || !isMaskInputSelectionAllowed(input)) {
    return;
  }

  try {
    if (direction) {
      input.setSelectionRange(start, end, direction);
    } else {
      input.setSelectionRange(start, end);
    }
  } catch {
    // InvalidStateError для input-типов без selection API
  }
}
