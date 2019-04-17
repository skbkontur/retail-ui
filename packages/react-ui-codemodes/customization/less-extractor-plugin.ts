/* tslint:disable:no-console */
import { IDynamicRules, IDynamicRulesAggregator } from "./dynamic-rules-aggregator";

export interface IExtractDynamicClassesPluginOptions {
  dynamicRulesAggregator: IDynamicRulesAggregator;
}

interface IVisitor<T = ILessNode> {
  run(node: T): T;
  visit(node: T): T;
}

interface PluginManagerInternal {
  addVisitor?(visitor: IVisitor): void;
}

interface ILessNode {
  name: string;
  root: boolean;
  index: number;
  _index: number;
  value: string | ILessNode | string[] | ILessNode[];
  fileInfo: () => { filename: string };
  _fileInfo: { filename: string };
  variable: boolean;
  parent?: ILessNode;

  __CALL_TEMPLATE__?: { name: string; args: ILessNode[] };
  __DYNAMIC_VARIABLE_NAME__?: string;
  __DERIVED_VARIABLE_NAME__?: string;
  __RULE_TO_EXTRACT__: boolean;
  __RULESET_TO_EXTRACT__: boolean;

  toCSS(context: object): string;
}

interface ILessRule extends ILessNode {}

interface ILessSelectorNode extends ILessRule {
  elements: ILessRule[];
}

interface ILessRuleset extends ILessRule {
  rules: ILessRule[];
  paths: ILessSelectorNode[][];
  selectors: ILessSelectorNode[];
}

export class ExtractDynamicRulesPlugin implements Less.Plugin {
  public minVersion = [3, 0, 0];
  private _options: IExtractDynamicClassesPluginOptions;

  constructor(options: IExtractDynamicClassesPluginOptions) {
    this._options = options;
  }

  public install(less: LessStatic, pluginManager: Less.PluginManager & PluginManagerInternal) {
    const dra = this._options.dynamicRulesAggregator;
    pluginManager.addVisitor!(new EDRPreVisitor(less));
    pluginManager.addVisitor!(new EDRVisitor(less, dra));
  }

  public setOptions(dynamicRulesMap: IDynamicRulesAggregator) {
    this._options.dynamicRulesAggregator = dynamicRulesMap;
  }
}

class EDRPreVisitor implements IVisitor {
  public isPreEvalVisitor = true;

  private _less: LessStatic & any;
  private _visitor: IVisitor;

  constructor(less: LessStatic) {
    const LessVisitor = (less as any).visitors.Visitor;
    this._less = less;
    this._visitor = new LessVisitor(this);
    this._patchVariableEval();
    this._patchCallEval();
  }

  public run(root: ILessNode) {
    return this._visitor.visit(root);
  }

  public visit(node: ILessNode) {
    return node;
  }

  private _patchCallEval() {
    const Call = this._less.tree.Call;
    const originalCallEval = Call.prototype.eval;
    const fToPatch = ['lighten', 'darken', 'contrast', 'red', 'green', 'blue', 'alpha'];
    Call.prototype.eval = function patchedCall(context: any) {
      const result: ILessNode = originalCallEval.call(this, context);

      if (fToPatch.includes(this.name) && this.args) {
        const evaluatedArguments = this.args.map((a: any) => a.eval(context));
        if (evaluatedArguments.some((a: ILessNode) => a.__DYNAMIC_VARIABLE_NAME__ || a.__DERIVED_VARIABLE_NAME__)) {
          result.__CALL_TEMPLATE__ = {
            name: this.name,
            args: evaluatedArguments,
          };
        }
      }

      return result;
    };
  }

  // NOTE: mark variables from variables.less for future patching
  private _patchVariableEval = () => {
    const Variable = this._less.tree.Variable;
    const originalVariableEval = Variable.prototype.eval;

    Variable.prototype.eval = function patchedEval(context: any) {
      const result: ILessNode = originalVariableEval.call(this, context);
      const frames = context.frames;
      const name: string = this.name;

      if (result.__DYNAMIC_VARIABLE_NAME__) {
        // console.log('[less-extractor-plugin.ts]', 'patchedEval from value', name);
        result.__DERIVED_VARIABLE_NAME__ = name;
      } else if (Array.isArray(result.value) && result.value.some((v: any) => v.__DYNAMIC_VARIABLE_NAME__)) {
        // console.log('[less-extractor-plugin.ts]', 'patchedEval from values array', name);
        result.__DERIVED_VARIABLE_NAME__ = name;
      } else {
        for (const frame of frames) {
          const variableDeclaration = frame.variable(name);
          if (variableDeclaration) {
            const fileInfo = variableDeclaration.fileInfo();
            if (fileInfo.filename && fileInfo.filename.endsWith('variables.less')) {
              // console.log('[less-extractor-plugin.ts]', 'patchedEval', name);
              result.__DYNAMIC_VARIABLE_NAME__ = `:variable(${name.replace('@', '')})`;
              break;
            }
          }
        }
      }

      return result;
    };
  };
}

class EDRVisitor implements IVisitor {
  public isReplacing = true;
  public isPreEvalVisitor = false;

  private readonly _dra: IDynamicRulesAggregator;
  private readonly _less: LessStatic & any;
  private readonly _visitor: IVisitor;
  private _currentRuleset: ILessRuleset | null = null;
  private _currentRule: ILessRule | null = null;
  private _extractedRules: IDynamicRules = {};

  constructor(less: LessStatic, dynamicRulesAggregator: IDynamicRulesAggregator) {
    const LessVisitor = (less as any).visitors.Visitor;
    const QuotedNode = (less as any).tree.Quoted;
    this._less = less;
    this._dra = dynamicRulesAggregator;
    this._visitor = new LessVisitor(this);

    const visitorNames = Object.keys(this._less.tree);
    for (const visitorName of visitorNames) {
      const visitName = `visit${visitorName}`;

      // @ts-ignore
      if (!this[visitName]) {
        // @ts-ignore
        this[visitName] = (node: ILessNode) => {
          if (this._currentRule) {
            if (node.__CALL_TEMPLATE__) {
              const argz = node.__CALL_TEMPLATE__.args.map((a: ILessNode) => {
                a = this._visitor.visit(a);
                return `'${a.toCSS({ tabLevel: 0 })}'`;
              });

              const content = `:functions[${node.__CALL_TEMPLATE__.name}](${argz.join(', ')})`;
              return new QuotedNode('"', content, true, node._index, node._fileInfo)
            }

            if (node.__DYNAMIC_VARIABLE_NAME__) {
              // console.count('USED DYNAMIC VAR');
              this._currentRule.__RULE_TO_EXTRACT__ = true;
              const content = camelize(node.__DYNAMIC_VARIABLE_NAME__);
              const quotedNode = new QuotedNode('"', content, true, node._index, node._fileInfo);
              quotedNode.__CALL_TEMPLATE__ = node.__CALL_TEMPLATE__;
              return quotedNode;
            }

            if (node.__DERIVED_VARIABLE_NAME__) {
              // console.count('USED DERIVED VAR');
              this._currentRule.__RULE_TO_EXTRACT__ = true;
            }
          }

          return node;
        };
      }
    }
  }

  public run(root: ILessNode) {
    return this._visitor.visit(root);
  }

  public visit(node: ILessNode) {
    return node;
  }

  public visitRuleset(node: ILessRuleset) {
    this.isReplacing = false;
    if (!node.root) {
      if (this._currentRuleset) {
        throw new Error('Got nested Ruleset, something went wrong');
      }

      this._currentRuleset = node;
    }
    return node;
  }

  public visitDeclaration(node: ILessRule) {
    if (this._currentRuleset) {
      if (this._currentRule) {
        throw new Error('Got nested Rule declaration, something went wrong');
      }
      this.isReplacing = true;
      this._currentRule = node;
    }
    return node;
  }

  public visitDeclarationOut(node: ILessRule) {
    const ruleset = this._currentRuleset;
    const rule = this._currentRule;
    if (ruleset && rule && rule.__RULE_TO_EXTRACT__) {
      this._extractedRules[rule.name] = extractRuleValue(rule.value as ILessRule);
      this._dra.markForRemoval(
        rule.fileInfo().filename,
        rule
          .toCSS({ tabLevel: 0 })
          .replace(/:variable\(/g, '@')
          .replace(/\)/g, ''),
        { index: rule._index },
      );
      replaceRuleWithComment(rule, ruleset, this._less);
    }
    this._currentRule = null;
  }

  public visitRulesetOut(node: ILessRuleset) {
    const ruleset = this._currentRuleset;
    const rulesToExtract = this._extractedRules;
    const CommentNode = (this._less as any).tree.Comment;
    if (ruleset && Object.keys(rulesToExtract).length > 0) {
      const whole = ruleset.toCSS({ tabLevel: 0 });
      const fullSelector = whole
        .substr(0, whole.indexOf('{'))
        .replace('\r\n', '')
        .replace('\n', '')
        .replace(/:local/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      // console.log("[less-extractor-plugin.ts]", "SELECTOR", fullSelector);

      const isPartial = !ruleset.rules.every(rule => rule instanceof CommentNode);
      this._dra.addRuleset(fullSelector, { isPartial, rules: this._extractedRules });
      this._extractedRules = {};
    }

    this._currentRuleset = null;
  }
}

const STRING_CAMELIZE_REGEXP_1 = /(-|_|\.|\s)+(.)?/g;
const STRING_CAMELIZE_REGEXP_2 = /(^|\/)([A-Z])/g;
function camelize(str: string): string {
  return str
    .replace(STRING_CAMELIZE_REGEXP_1, (match, separator, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(STRING_CAMELIZE_REGEXP_2, match => match.toLowerCase());
}

function extractRuleValue(value: ILessRule | ILessRule[]) {
  if (!value) {
    return '';
  }
  return Array.isArray(value)
    ? value
        .map(v => v.toCSS({ tabLevel: 0 }))
        .join(' ')
        .trim()
    : value.toCSS({ tabLevel: 0 }).trim();
}

function replaceRuleWithComment(rule: ILessRule, ruleset: ILessRuleset, less: LessStatic) {
  const CommentNode = (less as any).tree.Comment;
  const ruleCss = rule.toCSS({ tabLevel: 0 });

  // console.log('[less-extractor-plugin.ts]', 'replaceRuleWithComment', ruleCss);

  const indexToReplace = ruleset.rules.findIndex(r => r === rule);
  const comment: ILessRule = new CommentNode(`/*${ruleCss}*/` + '\n', false, rule._index, rule._fileInfo);
  ruleset.rules.splice(indexToReplace, 1, comment);
}
