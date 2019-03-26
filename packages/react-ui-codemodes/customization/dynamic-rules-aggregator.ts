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
      console.log(`Adding ruleset for existing key=${key}, trying to merge`);
      const existing = RuleSets[this._id].get(key)!;
      Object.keys(ruleset.rules).forEach(ruleName => {
        if(existing.rules[ruleName]) {
          console.warn(`Merge conflict: already has rule for ${ruleName} - overriding ${existing.rules[ruleName]} with ${ruleset.rules[ruleName]}. Consider revising sources.`)
        }
        existing.rules[ruleName] = ruleset.rules[ruleName]
      });
      console.log(`Done merging key=${key}`);
    }

    RuleSets[this._id].set(key, ruleset);
  }

  public getRulesets(): IDynamicRulesetsMap {
    return RuleSets[this._id];
  }
}
