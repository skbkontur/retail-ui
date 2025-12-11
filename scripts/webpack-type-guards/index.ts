import type { RuleSetRule, RuleSetUseItem } from 'webpack';

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object';
}

export function hasTestInRule(rule: unknown): rule is RuleSetRule & { test: RegExp } {
  return isObject(rule) && 'test' in rule && rule.test instanceof RegExp;
}

export function hasUseInRule(rule: unknown): rule is RuleSetRule & { use?: RuleSetUseItem[] } {
  return isObject(rule) && 'use' in rule;
}

export function isRuleSetUseItem(use: unknown): use is RuleSetUseItem & { loader: string } {
  return isObject(use) && 'loader' in use;
}
