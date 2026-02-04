import type { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  btnWithIconPaddingLeftSmall: "btnWithIconPaddingSmall",
  tooltipPaddingY: "tooltipPaddingYSmall",
  tooltipPaddingX: "tooltipPaddingXSmall",
  tooltipCloseBtnPadding: "tooltipCloseBtnPaddingSmall",
  tooltipBorderRadius: "tooltipBorderRadiusSmall",
  tooltipPinOffsetY: "tooltipPinOffsetYSmall",
  tooltipPinOffsetX: "tooltipPinOffsetXSmall",
  tooltipMargin: "tooltipMarginSmall",
  tooltipPinSize: "tooltipPinSizeSmall",
  tooltipFontSize: "tooltipFontSizeSmall",
  tooltipLineHeight: "tooltipLineHeightSmall",
  mobileSidePageCloseButtonRightPadding: "mobileSidePageCloseButtonPadding",
  pagingFontSize: "pagingFontSizeSmall",
  pagingLineHeight: "pagingLineHeightSmall",
  pagingPageLinkPaddingY: "pagingPageLinkPaddingYSmall",
  pagingPageLinkPaddingX: "pagingPageLinkPaddingXSmall",
  pagingDotsPadding: "pagingDotsPaddingSmall"
};

export default function transform(file: FileInfo, api: API): string | undefined {
  const j = api.jscodeshift;
  let modified = false;
  const result = j(file.source)
    .find(j.ObjectExpression)
    .find(j.Identifier, (node) => !!RENAMED_VARS[node.name])
    .replaceWith((path) => {
      path.node.name = RENAMED_VARS[path.node.name];
      modified = true;
      return path.node;
    });
  if (modified) {
    return result.toSource({ lineTerminator: '\n' });
  }
}
