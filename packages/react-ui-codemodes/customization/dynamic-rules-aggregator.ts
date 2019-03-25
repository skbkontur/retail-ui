/* tslint:disable:no-console */

export interface IDynamicRules { [key: string]: string }
export interface IDynamicRuleset { isPartial: boolean, rules: IDynamicRules }
export type IDynamicRulesetsMap = Map<string, IDynamicRuleset>;
export interface IDynamicRulesAggregator {
  addRuleset(className: string, ruleset: IDynamicRuleset): void;
  getRulesets(): IDynamicRulesetsMap;
}

// NOTE: we need this whole pile of hack just because less creates deep copy of the passed options

const RuleSets: IDynamicRulesetsMap[] = [];

export class DynamicRulesAggregator implements IDynamicRulesAggregator {
  private readonly _id: number;
  constructor(id: number) {
    this._id = id;
    if (!RuleSets[this._id]) {
      RuleSets[this._id] = new Map();
    } else {
      throw new Error(`Already have DynamicRulesAggregator with id=${id}`);
    }
  }

  public addRuleset(key: string, ruleset: IDynamicRuleset): void {
    if (RuleSets[this._id].has(key)) {
      console.log('=======================');
      console.log('addRule key', key);
      console.log('addRule old', RuleSets[this._id].get(key));
      console.log('addRule new', ruleset);
      console.log('=======================');
      console.log('\n');
    }

    RuleSets[this._id].set(key, ruleset);
  }

  public getRulesets(): IDynamicRulesetsMap {
    return RuleSets[this._id];
  }
}
