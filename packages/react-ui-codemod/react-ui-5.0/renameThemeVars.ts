 
import { API, FileInfo } from 'jscodeshift';

const RENAMED_VARS: Record<string, string> = {
  linkLineBorderBottomStyle: 'linkTextDecorationStyle',
  linkLineHoverBorderBottomStyle: 'linkHoverTextDecorationStyle',
  linkLineBorderBottomWidth: 'linkTextDecorationThickness',
  linkLineBorderBottomOpacity: 'linkTextUnderlineOpacity',
  linkLineBorderBottomColor: 'linkTextDecorationColor',
  btnLinkLineBorderBottomColor: 'btnLinkTextDecorationColor',
  btnLinkLineBorderBottomStyle: 'btnLinkTextDecorationStyle',
  btnLinkHoverLineBorderBottomStyle: 'btnLinkHoverTextDecorationStyle',
  btnLinkLineBorderBottomWidth: 'btnLinkTextDecorationThickness',
  btnLinkLineBorderBottomOpacity: 'btnLinkTextUnderlineOpacity',
  btnDefaultHoverBorderBottomColor: 'btnDefaultHoverTextDecorationColor',
  btnDefaultBorderBottomColor: 'btnDefaultTextDecorationColor',
  btnSuccessHoverBorderBottomColor: 'btnSuccessHoverTextDecorationColor',
  btnSuccessBorderBottomColor: 'btnSuccessTextDecorationColor',
  btnPrimaryHoverBorderBottomColor: 'btnPrimaryHoverTextDecorationColor',
  btnPrimaryBorderBottomColor: 'btnPrimaryTextDecorationColor',
  btnDangerHoverBorderBottomColor: 'btnDangerHoverTextDecorationColor',
  btnDangerBorderBottomColor: 'btnDangerTextDecorationColor',
  btnPayHoverBorderBottomColor: 'btnPayHoverTextDecorationColor',
  btnPayBorderBottomColor: 'btnPayTextDecorationColor',
};

export default function transform(file: FileInfo, api: API) {
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
