/* eslint-disable eqeqeq */
import { ChangeDetails } from '../core/change-details.js';
import { type TailDetails } from '../core/tail-details.js';
import { DIRECTION, type Direction } from '../core/utils.js';
import { Masked, type AppendFlags, type ExtractFlags, type MaskedOptions, type MaskedState } from './base.js';
import {
  createMask,
  normalizeOpts,
  registerMaskedPatternClass,
  type FactoryArg,
  type ExtendFactoryArgOptions,
  type NormalizedOpts,
} from './factory.js';
import type { PatternBlock } from './patterns/block.js';
import { ChunksTailDetails } from './patterns/chunk-tail-details.js';
import { PatternCursor } from './patterns/cursor.js';
import { PatternFixedDefinition } from './patterns/fixed-definition.js';
import { PatternInputDefinition } from './patterns/input-definition.js';
import './regexp.js'; // support for default definitions which are regexp's

export type MaskedPatternOptions<
  Value = string,
  M extends MaskedPattern<Value> = MaskedPattern<Value>,
  Props extends keyof M = never,
> = MaskedOptions<M, 'definitions' | 'blocks' | 'placeholderChar' | 'displayChar' | 'lazy' | Props>;

export interface Definitions {
  [k: string]: FactoryArg;
}

export type MaskedPatternState = MaskedState & {
  _blocks: MaskedState[];
};

export interface BlockPosData {
  index: number;
  offset: number;
}

export interface BlockExtraOptions {
  expose?: boolean;
}

/** Pattern mask */
export class MaskedPattern<Value = string> extends Masked<Value> {
  static DEFAULTS = {
    ...Masked.DEFAULTS,
    lazy: true,
    placeholderChar: '_',
  };
  static STOP_CHAR = '`';
  static ESCAPE_CHAR = '\\';
  static InputDefinition = PatternInputDefinition;
  static FixedDefinition = PatternFixedDefinition;

  mask!: string;
  /** */
  blocks!: { [key: string]: ExtendFactoryArgOptions<BlockExtraOptions> };
  /** */
  definitions!: Definitions;
  /** Single char for empty input */
  placeholderChar!: string;
  /** Single char for filled input */
  displayChar!: string;
  /** Show placeholder only when needed */
  lazy!: boolean;
  /** Enable characters overwriting */
  overwrite?: boolean | 'shift' | undefined;
  /** */
  eager?: boolean | 'remove' | 'append' | undefined;
  /** */
  skipInvalid?: boolean | undefined;
  /** */
  autofix?: boolean | 'pad' | undefined;

  _blocks!: PatternBlock[];
  _maskedBlocks!: { [key: string]: number[] };
  _stops!: number[];
  exposeBlock?: Masked;

  constructor(opts: MaskedPatternOptions<Value>) {
    super({
      ...MaskedPattern.DEFAULTS,
      ...opts,
      definitions: Object.assign({}, PatternInputDefinition.DEFAULT_DEFINITIONS, opts?.definitions),
    } as MaskedOptions);
  }

  override updateOptions(opts: Partial<MaskedPatternOptions<Value>>): void {
    super.updateOptions(opts);
  }

  override _update(opts: Partial<MaskedPatternOptions<Value>>): void {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._rebuildMask();
  }

  _rebuildMask(): void {
    const defs = this.definitions;
    this._blocks = [];
    this.exposeBlock = undefined;
    this._stops = [];
    this._maskedBlocks = {};

    const pattern = this.mask;
    if (!pattern || !defs) {
      return;
    }

    let unmaskingBlock = false;
    let optionalBlock = false;

    for (let i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        const p = pattern.slice(i);
        const bNames = Object.keys(this.blocks).filter((bName) => p.indexOf(bName) === 0);
        // order by key length
        bNames.sort((a, b) => b.length - a.length);
        // use block name with max length
        const bName = bNames[0];
        if (bName) {
          const { expose, ...bOpts } = normalizeOpts(this.blocks[bName]) as NormalizedOpts<FactoryArg> &
            BlockExtraOptions; // TODO type Opts<Arg & Extra>
          const blockOpts = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...bOpts,
            parent: this,
          };
          const maskedBlock = createMask(blockOpts);

          if (maskedBlock) {
            this._blocks.push(maskedBlock);
            if (expose) {
              this.exposeBlock = maskedBlock;
            }

            // store block index
            if (!this._maskedBlocks[bName]) {
              this._maskedBlocks[bName] = [];
            }
            this._maskedBlocks[bName].push(this._blocks.length - 1);
          }

          i += bName.length - 1;
          continue;
        }
      }

      let char = pattern[i];
      let isInput = char in defs;

      if (char === MaskedPattern.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }

      if (char === '{' || char === '}') {
        unmaskingBlock = !unmaskingBlock;
        continue;
      }

      if (char === '[' || char === ']') {
        optionalBlock = !optionalBlock;
        continue;
      }

      if (char === MaskedPattern.ESCAPE_CHAR) {
        ++i;
        char = pattern[i];
        if (!char) {
          break;
        }
        isInput = false;
      }

      const def = isInput
        ? (new PatternInputDefinition({
            isOptional: optionalBlock,
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            ...normalizeOpts(defs[char]),
            parent: this,
          }) as PatternBlock)
        : new PatternFixedDefinition({
            char,
            eager: this.eager,
            isUnmasking: unmaskingBlock,
          });

      this._blocks.push(def);
    }
  }

  override get state(): MaskedPatternState {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      _blocks: this._blocks.map((b) => b.state),
    };
  }

  override set state(state: MaskedPatternState) {
    if (!state) {
      this.reset();
      return;
    }

    const { _blocks, ...maskedState } = state;
    this._blocks.forEach((b, bi) => (b.state = _blocks[bi]));
    this._value = maskedState._value;
  }

  override reset(): void {
    super.reset();
    this._blocks.forEach((b) => b.reset());
  }

  override get isComplete(): boolean {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every((b) => b.isComplete);
  }

  override get isFilled(): boolean {
    return this._blocks.every((b) => b.isFilled);
  }

  get isFixed(): boolean {
    return this._blocks.every((b) => b.isFixed);
  }

  get isOptional(): boolean {
    return this._blocks.every((b) => b.isOptional);
  }

  override doCommit(): void {
    this._blocks.forEach((b) => b.doCommit());
    super.doCommit();
  }

  override get unmaskedValue(): string {
    return this.exposeBlock
      ? this.exposeBlock.unmaskedValue
      : // eslint-disable-next-line no-param-reassign
        this._blocks.reduce((str, b) => (str += b.unmaskedValue), '');
  }

  override set unmaskedValue(unmaskedValue: string) {
    if (this.exposeBlock) {
      const tail = this.extractTail(
        this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length,
      );
      this.exposeBlock.unmaskedValue = unmaskedValue;
      this.appendTail(tail);
      this.doCommit();
    } else {
      this.resolve(unmaskedValue, {});
    }
  }

  override get value(): string {
    return this.exposeBlock
      ? this.exposeBlock.value
      : // TODO return _value when not in change?
        // eslint-disable-next-line no-param-reassign
        this._blocks.reduce((str, b) => (str += b.value), '');
  }

  override set value(value: string) {
    if (this.exposeBlock) {
      const tail = this.extractTail(
        this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length,
      );
      this.exposeBlock.value = value;
      this.appendTail(tail);
      this.doCommit();
    } else {
      this.resolve(value, { input: true });
    }
  }

  override get typedValue(): Value {
    if (this.exposeBlock) {
      return this.exposeBlock.typedValue;
    }
    return this.parse ? this.parse(this.value, this) : (this.unmaskedValue as Value);
  }

  override set typedValue(value: Value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(
        this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length,
      );
      this.exposeBlock.typedValue = value;
      this.appendTail(tail);
      this.doCommit();
    } else if (this.format) {
      this.value = this.format(value, this);
    } else {
      this.unmaskedValue = String(value);
    }
  }

  override get displayValue(): string {
    // eslint-disable-next-line no-param-reassign
    return this._blocks.reduce((str, b) => (str += b.displayValue), '');
  }

  override appendTail(tail: string | TailDetails): ChangeDetails {
    return super.appendTail(tail).aggregate(this._appendPlaceholder());
  }

  override _appendEager(): ChangeDetails {
    const details = new ChangeDetails();

    let startBlockIndex = this._mapPosToBlock(this.displayValue.length)?.index;
    if (startBlockIndex == null) {
      return details;
    }

    // TODO test if it works for nested pattern masks
    if (this._blocks[startBlockIndex].isFilled) {
      ++startBlockIndex;
    }

    for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
      const d = this._blocks[bi]._appendEager();
      if (!d.inserted) {
        break;
      }

      details.aggregate(d);
    }

    return details;
  }

  override _appendCharRaw(ch: string, flags: AppendFlags<MaskedPatternState> = {}): ChangeDetails {
    const blockIter = this._mapPosToBlock(this.displayValue.length);
    const details = new ChangeDetails();
    if (!blockIter) {
      return details;
    }

    for (let bi = blockIter.index, block; (block = this._blocks[bi]); ++bi) {
      const blockDetails = block._appendChar(ch, { ...flags, _beforeTailState: flags._beforeTailState?._blocks?.[bi] });

      details.aggregate(blockDetails);

      if (blockDetails.consumed) {
        break;
      } // go next char
    }

    return details;
  }

  override extractTail(fromPos: number = 0, toPos: number = this.displayValue.length): TailDetails {
    const chunkTail = new ChunksTailDetails();
    if (fromPos === toPos) {
      return chunkTail;
    }

    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
      const blockChunk = b.extractTail(bFromPos, bToPos);
      blockChunk.stop = this._findStopBefore(bi);
      blockChunk.from = this._blockStartPos(bi);
      if (blockChunk instanceof ChunksTailDetails) {
        blockChunk.blockIndex = bi;
      }

      chunkTail.extend(blockChunk);
    });

    return chunkTail;
  }

  override extractInput(
    fromPos: number = 0,
    toPos: number = this.displayValue.length,
    flags: ExtractFlags = {},
  ): string {
    if (fromPos === toPos) {
      return '';
    }

    let input = '';

    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });

    return input;
  }

  _findStopBefore(blockIndex: number): number | undefined {
    let stopBefore;
    for (let si = 0; si < this._stops.length; ++si) {
      const stop = this._stops[si];
      if (stop <= blockIndex) {
        stopBefore = stop;
      } else {
        break;
      }
    }
    return stopBefore;
  }

  /** Appends placeholder depending on laziness */
  override _appendPlaceholder(toBlockIndex?: number): ChangeDetails {
    const details = new ChangeDetails();
    if (this.lazy && toBlockIndex == null) {
      return details;
    }

    const startBlockIter = this._mapPosToBlock(this.displayValue.length);
    if (!startBlockIter) {
      return details;
    }

    const startBlockIndex = startBlockIter.index;
    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

    this._blocks.slice(startBlockIndex, endBlockIndex).forEach((b) => {
      if (!b.lazy || toBlockIndex != null) {
        details.aggregate(b._appendPlaceholder((b as MaskedPattern)._blocks?.length));
      }
    });

    return details;
  }

  /** Finds block in pos */
  _mapPosToBlock(pos: number): BlockPosData | undefined {
    let accVal = '';
    for (let bi = 0; bi < this._blocks.length; ++bi) {
      const block = this._blocks[bi];
      const blockStartPos = accVal.length;

      accVal += block.displayValue;

      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos,
        };
      }
    }
    return;
  }

  _blockStartPos(blockIndex: number): number {
    // eslint-disable-next-line no-param-reassign
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => (pos += b.displayValue.length), 0);
  }

  _forEachBlocksInRange(
    fromPos: number,
    // eslint-disable-next-line default-param-last
    toPos: number = this.displayValue.length,
    fn: (block: PatternBlock, blockIndex: number, fromPos: number, toPos: number) => void,
  ): void {
    const fromBlockIter = this._mapPosToBlock(fromPos);

    if (fromBlockIter) {
      const toBlockIter = this._mapPosToBlock(toPos);
      // process first block
      const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
      const fromBlockStartPos = fromBlockIter.offset;
      const fromBlockEndPos =
        toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

      if (toBlockIter && !isSameBlock) {
        // process intermediate blocks
        for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
          fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
        }

        // process last block
        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
      }
    }
  }

  override remove(fromPos: number = 0, toPos: number = this.displayValue.length): ChangeDetails {
    const removeDetails = super.remove(fromPos, toPos);
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });
    return removeDetails;
  }

  override nearestInputPos(cursorPos: number, direction: Direction = DIRECTION.NONE): number {
    if (!this._blocks.length) {
      return 0;
    }
    const cursor = new PatternCursor(this, cursorPos);

    if (direction === DIRECTION.NONE) {
      // -------------------------------------------------
      // NONE should only go out from fixed to the right!
      // -------------------------------------------------
      if (cursor.pushRightBeforeInput()) {
        return cursor.pos;
      }
      cursor.popState();
      if (cursor.pushLeftBeforeInput()) {
        return cursor.pos;
      }
      return this.displayValue.length;
    }

    // FORCE is only about a|* otherwise is 0
    if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
      // try to break fast when *|a
      if (direction === DIRECTION.LEFT) {
        cursor.pushRightBeforeFilled();
        if (cursor.ok && cursor.pos === cursorPos) {
          return cursorPos;
        }
        cursor.popState();
      }

      // forward flow
      cursor.pushLeftBeforeInput();
      cursor.pushLeftBeforeRequired();
      cursor.pushLeftBeforeFilled();

      // backward flow
      if (direction === DIRECTION.LEFT) {
        cursor.pushRightBeforeInput();
        cursor.pushRightBeforeRequired();
        if (cursor.ok && cursor.pos <= cursorPos) {
          return cursor.pos;
        }
        cursor.popState();
        if (cursor.ok && cursor.pos <= cursorPos) {
          return cursor.pos;
        }
        cursor.popState();
      }
      if (cursor.ok) {
        return cursor.pos;
      }
      if (direction === DIRECTION.FORCE_LEFT) {
        return 0;
      }

      cursor.popState();
      if (cursor.ok) {
        return cursor.pos;
      }

      cursor.popState();
      if (cursor.ok) {
        return cursor.pos;
      }

      return 0;
    }

    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
      // forward flow
      cursor.pushRightBeforeInput();
      cursor.pushRightBeforeRequired();

      if (cursor.pushRightBeforeFilled()) {
        return cursor.pos;
      }
      if (direction === DIRECTION.FORCE_RIGHT) {
        return this.displayValue.length;
      }

      // backward flow
      cursor.popState();
      if (cursor.ok) {
        return cursor.pos;
      }

      cursor.popState();
      if (cursor.ok) {
        return cursor.pos;
      }

      return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
    }

    return cursorPos;
  }

  override totalInputPositions(fromPos: number = 0, toPos: number = this.displayValue.length): number {
    let total = 0;
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      total += b.totalInputPositions(bFromPos, bToPos);
    });
    return total;
  }

  /** Get block by name */
  maskedBlock(name: string): PatternBlock | undefined {
    return this.maskedBlocks(name)[0];
  }

  /** Get all blocks by name */
  maskedBlocks(name: string): PatternBlock[] {
    const indices = this._maskedBlocks[name];
    if (!indices) {
      return [];
    }
    return indices.map((gi) => this._blocks[gi]);
  }

  override pad(flags?: AppendFlags): ChangeDetails {
    const details = new ChangeDetails();
    this._forEachBlocksInRange(0, this.displayValue.length, (b) => details.aggregate(b.pad(flags)));
    return details;
  }
}

registerMaskedPatternClass(MaskedPattern);
