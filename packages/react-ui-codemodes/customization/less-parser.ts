import { ExtractDynamicRulesPlugin } from './less-extractor-plugin';
import * as fs from 'fs';
import less from 'less';
import { IDynamicRulesAggregator } from './dynamic-rules-aggregator';

export function parseLess(lessPath: string, dynamicRulesAggregator: IDynamicRulesAggregator): string {
  const lessSource = fs.readFileSync(lessPath, { encoding: 'utf8' });
  const edrPlugin = new ExtractDynamicRulesPlugin({ dynamicRulesAggregator });
  const lessOptions = {
    filename: lessPath,
    syncImport: true,
    plugins: [edrPlugin],
    sourceMap: { outputSourceFiles: false },
  };

  let modifiedCss = '';
  // let lessSourceMap = '';
  less.render(lessSource, lessOptions, (error: Less.RenderError, result: Less.RenderOutput) => {
    if (error) {
      throw error;
    }

    modifiedCss = result.css;
    // lessSourceMap = result.map;
  });

  // console.log('[less-parser.ts]', 'lessSourceMap', lessSourceMap);

  /*SMR.resolveSources(JSON.parse(lessSourceMap), '', fs.readFile, (error: any, result: any) => {
    // console.log('[less-parser.ts]', 'restored', result.sourcesContent);
    // fs.writeFileSync(path.join(__dirname, 'ss.css'), modifiedCss, { encoding: 'utf8' });
    // fs.writeFileSync(path.join(__dirname, 'ss.less'), result.sourcesContent, { encoding: 'utf8' });
  });*/

  return modifiedCss;
}
