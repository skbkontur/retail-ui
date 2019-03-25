/* tslint:disable:no-console */
// @ts-ignore
import Tokenizer from 'css-selector-tokenizer';
import { IDynamicRuleset, IDynamicRulesetsMap } from './dynamic-rules-aggregator';

export interface ITokenizedRuleset {
  [key: string]: string[];
}
export interface ITokenizedElement {
  isPartial: boolean;
  rules: ITokenizedRuleset;
  cascade: Map<string[], ITokenizedRuleset>;
}
export type ITokenizedDynamicRulesMap = Map<string, ITokenizedElement>;

type ITokenNodeType =
  | 'selectors'
  | 'selector'
  | 'element'
  | 'id'
  | 'class'
  | 'operator'
  | 'pseudo-element'
  | 'pseudo-class'
  | 'spacing'
  | 'attribute'
  | 'nested-pseudo-class';

interface ITokenNode {
  type: ITokenNodeType;
  name: string;
  content: string;
  nodes: ITokenNode[];
  before: string;
  after: string;
}

export function tokenize(rulesetsMap: IDynamicRulesetsMap): ITokenizedDynamicRulesMap {
  const tokenizedMap: ITokenizedDynamicRulesMap = new Map();

  let rawSelectors = Array.from(rulesetsMap.keys());

  // console.log('[rules-tokenizer.ts]', 'raw length', rawSelectors.length);

  // first pass: only final targets, to extract 'rules'
  rawSelectors = rawSelectors.filter(rawSelector => {
    const selectors = Tokenizer.parse(rawSelector) as ITokenNode;

    if (selectors.type !== 'selectors') {
      throw new Error('Could not parse selectors');
    }

    selectors.nodes = selectors.nodes.filter(selector => {
      if (selector.type !== 'selector') {
        throw new Error('Could not parse selector');
      }

      const tokens = selector.nodes;

      const isBasic = tokens.length === 1 && tokens[0].type === 'class';
      const dynamicRuleset = rulesetsMap.get(rawSelector)!;
      if (isBasic) {
        const className = tokens[0].name;
        const tokenizedRuleset = tokenizeRules(dynamicRuleset);
        if (!tokenizedMap.has(className)) {
          tokenizedMap.set(className, {
            isPartial: dynamicRuleset.isPartial,
            rules: tokenizedRuleset,
            cascade: new Map(),
          });
        } else {
          console.warn(`Duplicate base class: ${className}`);
          const existingRules = tokenizedMap.get(className)!.rules;
          Object.keys(tokenizedRuleset).forEach(key => {
            if (existingRules[key]) {
              console.warn(`Class '${className}' already has ${key}, overriding`);
            }
            existingRules[key] = tokenizedRuleset[key];
          });
        }
        return false;
      } else {
        // find the class to which styles are going to be applied
        const targetToken = getTargetToken(tokens);

        if (!targetToken) {
          console.warn(`Could not find base class for ${rawSelector}, skipping`);
          return false;
        }

        // create dummy, if it hasn't been created (does not have its own styles)
        const className = targetToken.name;
        if (!tokenizedMap.has(className)) {
          tokenizedMap.set(className, {
            isPartial: false,
            rules: {},
            cascade: new Map(),
          });
        }
        return true;
      }
    });

    return selectors.nodes.length > 0;
  });

  // console.log('[rules-tokenizer.ts]', 'base size', tokenizedMap.size);
  // console.log('[rules-tokenizer.ts]', 'filtered length', rawSelectors.length);

  // second pass: filling 'cascade' rules
  rawSelectors.forEach(rawSelector => {
    const selectors = Tokenizer.parse(rawSelector) as ITokenNode;
    selectors.nodes.forEach(selector => {
      const tokens = selector.nodes;
      const isBasic = tokens.length === 1 && tokens[0].type === 'class';
      if (isBasic) {
        console.warn('Got basic selector on second pass, skipping');
        return;
      }

      // find the class to which styles are going to be applied
      const targetToken = getTargetToken(tokens);

      if (!targetToken) {
        console.warn(`Could not find base class for ${rawSelector} on second pass, skipping`);
        return;
      }

      const className = targetToken.name;
      const target = tokenizedMap.get(className);
      if (!target) {
        throw new Error(`tokenizedMap does not have ${className} on second pass, something went terribly wrong!`);
      }

      const processedTokens = tokens.map(t => processToken(t, className, tokenizedMap));
      const cascadeSelector = Tokenizer.stringify({ type: 'selector', nodes: processedTokens })
        .replace(/\\/g, '')
        .replace('.&', '&');

      // console.log('===================');
      // console.log('[rules-tokenizer.ts]', 'raw', rawSelector);
      // console.log('[rules-tokenizer.ts]', 'cas', cascadeSelector);
      // console.log('===================');
      // console.log('\n');
      const tokenizedCascadeSelector = tokenizeSelector(cascadeSelector);
      const dynamicRuleset = rulesetsMap.get(rawSelector)!;
      const tokenizedRuleset = tokenizeRules(dynamicRuleset);
      if (!target.cascade.has(tokenizedCascadeSelector)) {
        target.cascade.set(tokenizedCascadeSelector, tokenizedRuleset);
      } else {
        const existingCascade = target.cascade.get(tokenizedCascadeSelector)!;
        Object.keys(tokenizedRuleset).forEach(key => {
          if (existingCascade[key]) {
            console.warn(`Cascade selector ${cascadeSelector} in class '${className}' already has ${key}, overriding`);
          }
          existingCascade[key] = tokenizedRuleset[key];
        });
      }
    });

  });

  return tokenizedMap;
}

function getTargetToken(tokens: ITokenNode[]) {
  return  Array.from(tokens)
    .reverse()
    .find(t => t.type === 'class');
}

function tokenizeRules(ruleset: IDynamicRuleset): ITokenizedRuleset {
  const result: ITokenizedRuleset = {};
  const rules = ruleset.rules;
  Object.keys(rules).forEach(ruleName => {
    result[ruleName] = tokenizeRule(rules[ruleName]);
  });
  return result;
}

function tokenizeRule(rule: string): string[] {
  return rule.split(/(:variable\([a-z0-9]+\))/i);
}

// we need cache, because we use string[] as the key for the map, so it has to have the same reference
const TOKENIZED_SELECTORS_CACHE: ITokenizedRuleset = {};
function tokenizeSelector(selector: string): string[] {
  if (!TOKENIZED_SELECTORS_CACHE[selector]) {
    TOKENIZED_SELECTORS_CACHE[selector] = selector.split(
      /(:global\([a-z0-9]+\)|:static\([a-z0-9]+\)|:dynamic\([a-z0-9]+\))/i,
    );
  }
  /*console.log('===================');
  console.log('input', selector);
  console.log('output', TOKENIZED_SELECTORS_CACHE[selector]);
  console.log('===================');
  console.log('\n');*/

  return TOKENIZED_SELECTORS_CACHE[selector];
}

function processToken(
  t: ITokenNode,
  className: string,
  tokenizedMap: ITokenizedDynamicRulesMap,
  isInsideGlobal = false,
) {
  if (t.type === 'class') {
    const tClassName = t.name;
    if (isInsideGlobal) {
      // do nothing, less compiler made a good job for us
    } else if (tClassName === className) {
      // replace self with ampersand
      t.name = '&';
    } else if (tokenizedMap.has(tClassName) && !tokenizedMap.get(tClassName)!.isPartial) {
      // it's dynamic class name, nothing left of it's static counterpart
      t.name = `:dynamic(${tClassName})`;
    } else {
      // it's static class name (still fully or partially comes from css)
      t.name = `:static(${tClassName})`;
    }
  }

  if (t.type === 'nested-pseudo-class' && t.nodes) {
    t.nodes.forEach(nestedSelector => {
      if (nestedSelector.type === 'selector' && nestedSelector.nodes) {
        nestedSelector.nodes = nestedSelector.nodes.map(innerSelector =>
          processToken(innerSelector, className, tokenizedMap, t.name === 'global'),
        );
      }
    });
  }
  return t;
}
