/* eslint-disable import/no-default-export */
import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  checkboxLabelGap: 'checkboxCaptionGap',
  radioLabelGap: 'radioCaptionGap',
  radioLabelDisplay: 'radioCaptionDisplay',
  switcherLabelFontSizeSmall: 'switcherCaptionFontSizeSmall',
  switcherLabelFontSizeMedium: 'switcherCaptionFontSizeMedium',
  switcherLabelFontSizeLarge: 'switcherCaptionFontSizeLarge',
  switcherLabelLineHeightSmall: 'switcherCaptionLineHeightSmall',
  switcherLabelLineHeightMedium: 'switcherCaptionLineHeightMedium',
  switcherLabelLineHeightLarge: 'switcherCaptionLineHeightLarge',
  switcherLabelGapSmall: 'switcherCaptionGapSmall',
  switcherLabelGapMedium: 'switcherCaptionGapMedium',
  switcherLabelGapLarge: 'switcherCaptionGapLarge',
};

export default function transform(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source)
    .find(j.ObjectExpression)
    .find(j.Identifier, (node) => RENAMED_VARS[node.name])
    .replaceWith((path) => {
      path.node.name = RENAMED_VARS[path.node.name];
      modified = true;
      return path.node;
    });
  if (modified) {
    return result.toSource();
  }
}
