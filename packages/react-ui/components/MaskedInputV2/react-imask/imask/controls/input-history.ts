import { type Selection } from '../core/utils.js';

export interface InputHistoryState {
  unmaskedValue: string;
  selection: Selection;
}

export class InputHistory {
  static MAX_LENGTH = 100;
  states: InputHistoryState[] = [];
  currentIndex = 0;

  get currentState(): InputHistoryState | undefined {
    return this.states[this.currentIndex];
  }

  get isEmpty(): boolean {
    return this.states.length === 0;
  }

  push(state: InputHistoryState): void {
    // if current index points before the last element then remove the future
    if (this.currentIndex < this.states.length - 1) {
      this.states.length = this.currentIndex + 1;
    }
    this.states.push(state);
    if (this.states.length > InputHistory.MAX_LENGTH) {
      this.states.shift();
    }
    this.currentIndex = this.states.length - 1;
  }

  go(steps: number): InputHistoryState | undefined {
    this.currentIndex = Math.min(Math.max(this.currentIndex + steps, 0), this.states.length - 1);
    return this.currentState;
  }

  undo(): InputHistoryState | undefined {
    return this.go(-1);
  }

  redo(): InputHistoryState | undefined {
    return this.go(+1);
  }

  clear(): void {
    this.states.length = 0;
    this.currentIndex = 0;
  }
}
