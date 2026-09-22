/**
 * Deprecated token mappings. Old names → new names.
 */
export const DEPRECATED_TOKENS: Record<string, string> = {
  shapeBoldNeutral: 'shapeBoldNeutralSolid',
  shapeBoldNeutralHover: 'shapeBoldNeutralSolidHover',
  shapeBoldNeutralPressed: 'shapeBoldNeutralSolidPressed',
  shapeHeavyNeutral: 'shapeHeavyNeutralSolid',
  shapeOtherBacklessHover: 'shapeOtherBacklessAlphaHover',
  shapeOtherBacklessPressed: 'shapeOtherBacklessAlphaPressed',
  shapeOtherNeutralFaintSolid: 'shapeFaintNeutralSolid',
  shapeOtherNeutralFaintSolidHover: 'shapeFaintNeutralSolidHover',
  shapeOtherNeutralFaintSolidPressed: 'shapeFaintNeutralSolidPressed',
  shapeOtherNeutralPaleSolid: 'shapePaleNeutralSolid',
  shapeOtherNeutralPaleSolidHover: 'shapePaleNeutralSolidHover',
  shapeOtherNeutralPaleSolidPressed: 'shapePaleNeutralSolidPressed',
  shapeOtherNeutralSoftSolid: 'shapeSoftNeutralSolid',
  shapeOtherNeutralSoftSolidHover: 'shapeSoftNeutralSolidHover',
  shapeOtherNeutralSoftSolidPressed: 'shapeSoftNeutralSolidPressed',
  textLogo: 'illustrationProductLogo',
};

export const getDeprecatedTokens = (tokens: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [deprecatedKey, newKey] of Object.entries(DEPRECATED_TOKENS)) {
    if (newKey in tokens) {
      result[deprecatedKey] = tokens[newKey];
    }
  }
  return result;
};
