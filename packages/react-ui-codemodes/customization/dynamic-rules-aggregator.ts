/* tslint:disable:no-console */

export interface IDynamicRules { [key: string]: string }
export interface IDynamicRuleset { isPartial: boolean, rules: IDynamicRules }
export type IDynamicRulesetsMap = Map<string, IDynamicRuleset>;
export interface IDynamicRulesAggregator {
  addRuleset(className: string, ruleset: IDynamicRuleset): void;
  getRulesets(): IDynamicRulesetsMap;
}

// NOTE: we need this whole pile of hack just because less creates deep copy of the passed options

let id = 0;
const RuleSets: IDynamicRulesetsMap[] = [];

export class DynamicRulesAggregator implements IDynamicRulesAggregator {
  private readonly _id: number;
  constructor() {
    this._id = id++;
    if (!RuleSets[this._id]) {
      RuleSets[this._id] = new Map();
    }
  }

  public addRuleset(key: string, ruleset: IDynamicRuleset): void {
    if (RuleSets[this._id].has(key)) {
      console.warn('[dynamic-rules-aggregator.ts]', '=======================');
      console.log('[dynamic-rules-aggregator.ts]', 'addRule key', key);
      console.error('[dynamic-rules-aggregator.ts]', 'addRule old', RuleSets[this._id].get(key));
      console.info('[dynamic-rules-aggregator.ts]', 'addRule new', ruleset);
      console.warn('[dynamic-rules-aggregator.ts]', '=======================');
    }

    RuleSets[this._id].set(key, ruleset);
  }

  public getRulesets(): IDynamicRulesetsMap {
    return RuleSets[this._id];
  }
}
