import React from 'react';

import { DropdownMenu, MenuHeader, MenuItem, Select, Toast, ThemeFactory, ThemeContext } from '@skbkontur/react-ui';
import { BasicThemeClass } from '@skbkontur/react-ui/internal/themes/BasicTheme';
import { css, injectGlobal } from '@emotion/css';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';
import { SideMenuThemeIn } from '@skbkontur/side-menu';
import { WeatherMoonIcon16Regular } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Regular';
import { WeatherSunIcon16Regular } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Regular';
import type { Meta } from '@skbkontur/react-ui/typings/stories';

import { brand as brandSwatch } from '../lib/consts/default-swatch';
import { getColors } from '../get-colors';
import type { ColorFormat } from '../lib/utils/convert-color';

import { SideMenu } from '@skbkontur/side-menu';
import { Kontur } from '@skbkontur/logos/src/Kontur';
import { Product } from '@skbkontur/logos/src/Product';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Link } from '@skbkontur/react-ui/components/Link';
import { Radio } from '@skbkontur/react-ui/components/Radio';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup';
import { Tabs } from '@skbkontur/react-ui/components/Tabs';
import { Toggle } from '@skbkontur/react-ui/components/Toggle';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip';
import { IconArrowALeftRegular24 } from '@skbkontur/icons-v2/IconArrowALeftRegular24';
import { IconQuestionCircleLight20 } from '@skbkontur/icons-v2/IconQuestionCircleLight20';
import { IconWarningTriangleSolid20 } from '@skbkontur/icons-v2/IconWarningTriangleSolid20';
import { IconDocTextRegular24 } from '@skbkontur/icons-v2/IconDocTextRegular24';
import { IconCommentRectTextRegular24 } from '@skbkontur/icons-v2/IconCommentRectTextRegular24';
import { IconMarketShoppingBasketRegular24 } from '@skbkontur/icons-v2/IconMarketShoppingBasketRegular24';
import { IconSettingsGearRegular24 } from '@skbkontur/icons-v2/IconSettingsGearRegular24';
import { IconPeople2Regular24 } from '@skbkontur/icons-v2/IconPeople2Regular24';
import { IconStackHDownRegular24 } from '@skbkontur/icons-v2/IconStackHDownRegular24';
import { IconNaturePlantFlowerSolid20 } from '@skbkontur/icons-v2/IconNaturePlantFlowerSolid20';
import { AddonsTheme } from '@skbkontur/react-ui-addons';

interface TokenPair {
  key: string;
  value: {
    light: string;
    dark: string;
  };
}

injectGlobal(`
  [data-role=preview]:has([data-colors-controls]) {
    padding: 0 !important;
  }
`);

export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: true,
    },
  },
} as Meta;

/**
 * Библиотека состоит из семантических переменных, которые настраиваются через 3 параметра:
 * - **brand** — брендовый цвет `red | orange | green | mint | blue | blueDeep | violet | purple | #custom-hex`
 * - **accent** — акцентный цвет `gray | brand | #custom-hex` (по умолчанию gray)
 * - **theme** — тема `light | dark` (по умолчанию light)
 */
export const ColorsExampleStory = () => {
  const styles: Record<string, string> = {
    colors: css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;
      width: calc(100% - 32px);
      top: 0;
      background: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      width: calc(100% - 32px);
      margin-bottom: -24px;
      padding: 4px 16px 4px;
      font-weight: 600;
      color: #222;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 57px;
      z-index: 10;
      background: white;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.2;
    `,
    dropdownRow: css`
      display: flex;
      align-items: center;
      gap: 16px;
      width: calc(100% - 16px);
      padding: 8px;
      margin: 0 8px;
      border-radius: 8px;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      transition: background 0.1s ease;
      font-family: inherit;
      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    `,
    colorName: css`
      flex: 1;
    `,
    colorTileWrapper: css`
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 140px;
    `,
    colorTile: css`
      height: 32px;
      width: 32px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 8px;
      flex-shrink: 0;
    `,
    colorHex: css`
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      color: #8b8b8b;
    `,
    groupHeader: css`
      position: sticky;
      top: 57px;
      width: 50%;
      z-index: 10;
      background: white;
      font-size: 14px;
      line-height: 1;
      padding: 4px 16px;
      font-weight: bold;
    `,
    controls: css`
      position: sticky;
      z-index: 10;
      bottom: 0;
      padding: 8px;
      background: white;
      box-shadow: 0 -1px rgba(0, 0, 0, 0.15);
      margin-top: auto;
    `,
  };

  const defaultColorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = 'mint';
  const defaultAccentColor = 'brand';
  const defaultTheme = 'dark';
  const colorOptions = [...defaultColorOptions, 'custom'];
  const baseAccentOptions = ['gray', 'brand', 'custom'];

  const [activeTab, setActiveTab] = React.useState<string>('tab-0');
  const [activeRadio, setActiveRadio] = React.useState<number>(1);
  const [checked, setChecked] = React.useState<boolean>(true);
  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [colorTheme, setColorTheme] = React.useState<'light' | 'dark'>(defaultTheme);

  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

  const getBrandColorForSwatch = React.useCallback(() => {
    if (brand === 'custom') {
      return customBrandColor.trim() !== ''
        ? customBrandColor
        : brandSwatch[defaultBrandColor as keyof typeof brandSwatch];
    }
    return brandSwatch[brand as keyof typeof brandSwatch];
  }, [brand, customBrandColor]);

  const renderColorItem = (color: string, text: string) => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            flexShrink: 0,
            background: color,
            width: 12,
            height: 12,
            borderRadius: 4,
          }}
        />
        {text}
      </div>
    );
  };

  const renderBrandItem = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customBrandColor.trim() !== '' ? customBrandColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    return renderColorItem(brandSwatch[value as keyof typeof brandSwatch], value);
  };

  const renderThemeItem = (value: 'light' | 'dark') => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {value === 'light' ? <WeatherSunIcon16Regular /> : <WeatherMoonIcon16Regular />}
        {value}
      </div>
    );
  };

  const safeBrandColor = React.useMemo(() => {
    if (brand !== 'custom') {
      return brand;
    }
    return customBrandColor.trim() !== '' ? customBrandColor : defaultBrandColor;
  }, [brand, customBrandColor]);

  const safeAccentColor = React.useMemo(() => {
    if (accent !== 'custom') {
      return accent;
    }
    return customAccentColor.trim() !== '' ? customAccentColor : defaultAccentColor;
  }, [accent, customAccentColor]);

  const isAccentDisabled = (accentValue: string, currentBrand: string) => {
    return accentValue === 'brand' && (currentBrand === 'red' || currentBrand === 'orange');
  };

  const renderAccentItemValue = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customAccentColor.trim() !== '' ? customAccentColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    const color = value === 'gray' ? '#3d3d3d' : getBrandColorForSwatch();
    return renderColorItem(color, value);
  };

  const renderAccentMenuItem = (value: string) => {
    const content = renderAccentItemValue(value);
    return (
      <div key={value} style={{ opacity: isAccentDisabled(value, brand) ? 0.4 : 1 }}>
        {content}
      </div>
    );
  };

  React.useEffect(() => {
    if (isAccentDisabled(accent, brand)) {
      setAccent('gray');
      Toast.push('Акцент brand недоступен для red и orange', null, 3000);
    }
  }, [brand, accent]);

  const effectiveAccentColor = React.useMemo(() => {
    if (isAccentDisabled(safeAccentColor, safeBrandColor)) {
      return 'gray';
    }
    return safeAccentColor;
  }, [safeBrandColor, safeAccentColor]);

  let c = getColors({
    brand: safeBrandColor,
    accent: effectiveAccentColor,
    theme: colorTheme,
  });

  const theme = ThemeFactory.create<BasicThemeClass | SideMenuThemeIn | AddonsTheme>({
    brand: c.shapeBoldBrandOriginal,
    bgDefault: c.surfaceHigh,
    bgSecondary: c.surfaceHigh,
    bgDisabled: c.shapeOtherDisabled,
    errorText: c.textErrorHeavy,
    borderColorDisabled: c.lineNeutralFaint,
    placeholderColor: c.textNeutralPale,
    outlineColorFocus: c.surfaceBase,
    placeholderColorLight: `color-mix(in srgb, ${c.textNeutralPale}, transparent 40%)`,
    textColorDefault: c.textNeutralHeavy,
    textColorDisabled: c.textNeutralPale,
    borderColorFocus: c.lineAccentBold,
    borderColorError: c.lineErrorBold,
    borderColorWarning: c.lineWarningBold,
    linkColor: c.textAccentHeavy,
    linkHoverColor: c.textAccentHeavyHover,
    linkActiveColor: c.textAccentHeavyPressed,
    linkSuccessColor: c.textSuccessHeavy,
    linkSuccessHoverColor: c.textSuccessHeavyHover,
    linkSuccessActiveColor: c.textSuccessHeavyPressed,
    linkDangerColor: c.textErrorHeavy,
    linkDangerHoverColor: c.textErrorHeavyHover,
    linkDangerActiveColor: c.textErrorHeavyPressed,
    linkDisabledColor: c.textNeutralPale,
    linkGrayedColor: c.textNeutralSoft,
    linkGrayedHoverColor: c.textNeutralHeavy,
    linkGrayedActiveColor: c.textNeutralHeavy,
    linkFocusOutlineColor: c.lineAccentBold,
    tokenDisabledBg: c.shapeOtherDisabled,
    tokenBg: c.shapeFaintNeutralAlpha,
    tokenColor: c.textNeutralHeavy,
    tokenBorderColor: c.lineNeutralPale,
    tokenBgHover: c.shapeFaintNeutralAlphaHover,
    tokenColorHover: c.textNeutralHeavy,
    tokenBorderColorHover: c.lineNeutralPale,
    tokenBgActive: c.shapeBoldAccent,
    tokenColorActive: c.textOnAccentBoldHeavy,
    tokenInputBorderColor: c.lineNeutralPale,
    tokenInputBorderColorHover: c.lineNeutralPaleHover,
    tokenInputBorderColorFocus: c.lineAccentBold,
    tokenInputBorderColorError: c.lineErrorBold,
    tokenInputBorderColorWarning: c.lineWarningBold,
    tokenInputBorderTopColor: c.lineNeutralPale,
    tokenInputPlaceholderColor: c.textNeutralPale,
    tokenInputPlaceholderColorLight: `color-mix(in srgb, ${c.textNeutralPale}, transparent 40%)`,
    tokenInputDisabledBg: c.shapeOtherDisabled,
    tokenInputBg: c.shapeOtherField,
    tokenInputMenuPopupBg: 'transparent',
    loaderBg: c.shapeInvertedNeutralHeavy,
    btnDisabledBorderColor: c.lineNeutralFaint,
    btnCheckedBg: c.shapeBoldAccent,
    btnCheckedDisabledBg: c.shapeOtherAccentBoldDisabled,
    btnCheckedDisabledColor: c.textInvertedNeutralSoft,
    btnCheckedTextColor: c.textOnAccentBoldHeavy,
    btnDefaultBg: c.shapeOtherBase,
    btnDefaultHoverBg: c.shapeOtherBaseHover,
    btnDefaultActiveBg: c.shapeOtherBasePressed,
    btnDefaultHoverTextColor: c.textNeutralHeavy,
    btnDefaultBorderColor: c.lineNeutralPale,
    btnSuccessBg: c.shapeBoldSuccess,
    btnSuccessBorderColor: c.shapeBoldSuccess,
    btnSuccessHoverBg: c.shapeBoldSuccessHover,
    btnSuccessHoverBorderColor: c.shapeBoldSuccessHover,
    btnSuccessHoverTextColor: c.textConstHeavyWhite,
    btnSuccessTextColor: c.textConstHeavyWhite,
    btnSuccessActiveBg: c.shapeBoldSuccessPressed,
    btnSuccessActiveBorderColor: c.shapeBoldSuccessPressed,
    btnPrimaryBg: c.shapeBoldAccent,
    btnPrimaryHoverBg: c.shapeBoldAccentHover,
    btnPrimaryActiveBg: c.shapeBoldAccentPressed,
    btnPrimaryHoverTextColor: '',
    btnPrimaryBorderColor: c.shapeBoldAccent,
    btnPrimaryHoverBorderColor: c.shapeBoldAccentHover,
    btnPrimaryActiveBorderColor: c.shapeBoldAccentPressed,
    btnPrimaryTextColor: c.textOnAccentBoldHeavy,
    btnDangerBg: c.shapeBoldError,
    btnDangerHoverBg: c.shapeBoldErrorHover,
    btnDangerHoverBorderColor: c.shapeBoldErrorHover,
    btnDangerTextColor: c.textConstHeavyWhite,
    btnDangerActiveBg: c.shapeBoldErrorPressed,
    btnDangerActiveBorderColor: c.shapeBoldErrorPressed,
    btnPayBg: c.shapeBoldWarning,
    btnPayBorderColor: c.shapeBoldWarning,
    btnPayHoverBg: c.shapeBoldWarningHover,
    btnPayHoverBorderColor: c.shapeBoldWarningHover,
    btnPayTextColor: c.textConstHeavyBlack,
    btnPayActiveBg: c.shapeBoldWarningPressed,
    btnPayActiveBorderColor: c.shapeBoldWarningPressed,
    btnMenuArrowColor: c.textNeutralSoft,
    btnDisabledBg: c.shapeOtherDisabled,
    btnBorderColorWarning: c.lineWarningBold,
    btnBorderColorError: c.lineErrorBold,
    btnErrorSecondary: c.shapeFaintError,
    btnWarningSecondary: c.shapeFaintWarning,
    btnInsetColor: c.surfaceBase,
    btnDisabledTextColor: c.textNeutralPale,
    btnBacklessBg: 'transparent',
    btnBacklessHoverBg: c.shapeOtherBacklessHover,
    btnBacklessActiveBg: c.shapeOtherBacklessPressed,
    btnBacklessActiveBorderColor: c.lineNeutralPale,
    btnBacklessBorderColor: c.lineNeutralPale,
    btnBacklessDisabledBorderColor: c.lineNeutralFaint,
    btnBacklessHoverBorderColor: c.lineNeutralPale,
    btnBacklessHoverTextColor: '',
    btnTextHoverBg: c.shapeOtherBacklessHover,
    btnTextActiveBg: c.shapeOtherBacklessPressed,
    selectDefaultBg: c.shapeOtherField,
    selectPlaceholderColor: c.textNeutralPale,
    selectPlaceholderColorDisabled: c.textNeutralPale,
    selectMenuArrowColorDisabled: c.textNeutralPale,
    selectBgDisabled: c.shapeOtherDisabled,
    selectBorderColorDisabled: c.lineNeutralFaint,
    tooltipCloseBtnColor: c.textNeutralPale,
    tooltipCloseBtnHoverColor: c.textNeutralHeavy,
    tooltipTextColor: c.textNeutralHeavy,
    tooltipBg: c.surfaceHigh,
    kebabBackgroundHover: c.shapeOtherBacklessHover,
    kebabBackgroundActive: c.shapeOtherBacklessPressed,
    kebabIconColor: c.textNeutralSoft,
    modalWindowShadow: '0px 16px 32px 0px rgba(0, 0, 0, 0.06)',
    modalBackBg: c.surfaceModalBackdrop,
    modalBg: c.surfaceHigh,
    modalBackOpacity: '1',
    modalCloseButtonColor: c.textNeutralPale,
    modalCloseButtonDisabledColor: c.textNeutralPale,
    modalCloseButtonHoverColor: c.textNeutralHeavy,
    modalFixedHeaderBg: c.surfaceHigh,
    modalFooterBg: c.surfaceHigh,
    modalHeaderTextColor: c.textNeutralHeavy,
    modalSeparatorBorderBottom: `1px solid ${c.lineNeutralFaint}`,
    sidePageFooterPanelBg: c.surfaceHigh,
    sidePageBackingBg: c.surfaceModalBackdrop,
    sidePageBackingBgOpacity: '1',
    sidePageCloseButtonColor: c.textNeutralPale,
    sidePageCloseButtonHoverColor: c.textNeutralHeavy,
    sidePageContainerShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    sidePageBgDefault: c.surfaceHigh,
    sidePageHeaderTextColor: c.textNeutralHeavy,
    dateInputMaskColor: c.textNeutralPale,
    calendarBottomSeparatorBorderColor: c.lineNeutralFaint,
    calendarBottomSeparatorBorder: `1px solid ${c.lineNeutralFaint}`,
    calendarBg: c.surfaceHigh,
    calendarCellBg: 'transparent',
    calendarCellHoverColor: '',
    calendarCellActiveHoverColor: '',
    calendarCellWeekendColor: c.customizableHeavyRed,
    calendarCellTodayBorder: '1px solid',
    calendarCellSelectedBgColor: c.shapeBoldAccent,
    calendarCellSelectedFontColor: c.textOnAccentBoldHeavy,
    calendarMonthHeaderStickedBgColor: c.surfaceHigh,
    calendarMonthTitleBorderBottomColor: c.lineNeutralFaint,
    calendarCellHoverBgColor: c.shapeOtherBacklessHover,
    datePickerOpenBtnColor: c.textNeutralHeavy,
    rangeCalendarCellBg: c.shapeFaintNeutralAlpha,
    rangeCalendarCellEndBg: c.shapeBoldAccent,
    rangeCalendarCellEndColor: c.textOnAccentBoldHeavy,
    rangeCalendarCellHoverBg: c.shapeOtherBacklessHover,
    dateSelectMenuBg: c.surfaceHigh,
    dateSelectMenuItemBgDisabled: c.surfaceHigh,
    dateSelectMenuItemFontActive: '',
    dateSelectMenuItemFontSelected: c.textNeutralHeavy,
    dateSelectMenuItemFontDisabled: c.textNeutralPale,
    dateSelectTextColorDisabled: c.textNeutralPale,
    dateSelectTextColorDefault: c.textNeutralHeavy,
    dateSelectLinkColor: c.textAccentHeavy,
    dateSelectPopupBoxShadow: '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)',
    dateSelectTextColorInvert: '',
    pagingPageLinkActiveBg: c.shapeOtherBacklessPressed,
    pagingPageLinkDisabledActiveBg: c.shapeOtherDisabled,
    pagingPageLinkHoverBg: c.shapeOtherBacklessHover,
    pagingDotsColor: c.textNeutralPale,
    pagingPageLinkHintColor: c.textNeutralSoft,
    hintColor: c.textInvertedNeutralHeavy,
    mobileHintColor: c.textInvertedNeutralHeavy,
    hintBgColor: c.shapeHeavyNeutral,
    toastBg: c.shapeHeavyNeutral,
    toastErrorBg: c.shapeBoldError,
    toastColor: c.textInvertedNeutralHeavy,
    toastLinkColor: c.textInvertedNeutralHeavy,
    toastLinkTextDecorationHover: '',
    toastLinkBgHover: c.shapeInvertedBacklessHover,
    toastLinkBgActive: c.shapeInvertedBacklessPressed,
    toastCloseColor: c.textInvertedNeutralSoft,
    toastCloseHoverColor: c.textInvertedNeutralHeavy,
    toastColorError: c.textConstHeavyWhite,
    toastLinkColorError: c.textConstHeavyWhite,
    toastLinkBgHoverError: c.shapeConstBacklessWhiteHover,
    toastLinkBgActiveError: c.shapeConstBacklessWhiteHover,
    toastLinkColorActiveError: c.textConstHeavyWhite,
    toastCloseColorError: c.textConstSoftWhite,
    toastCloseHoverColorError: c.textConstHeavyWhite,
    dropdownDefaultBg: c.shapeOtherBase,
    dropdownBgDisabled: c.shapeOtherDisabled,
    dropdownBorderColorDisabled: c.lineNeutralFaint,
    dropdownTextColorDisabled: c.textNeutralPale,
    menuBgDefault: c.surfaceHigh,
    menuShadow: '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)',
    menuItemSelectedBg: c.shapeOtherBacklessPressed,
    menuItemHoverBg: c.shapeOtherBacklessHover,
    menuItemLinkColor: c.textAccentHeavy,
    menuItemCommentColor: c.textNeutralSoft,
    menuItemCommentOpacity: '1',
    menuItemDisabledColor: c.textNeutralPale,
    menuMessageTextColor: c.textNeutralPale,
    menuHeaderColor: c.textNeutralSoft,
    menuFooterColor: c.textNeutralSoft,
    menuSeparatorBorderColor: c.lineNeutralFaint,
    toggleTextColor: c.textNeutralHeavy,
    toggleBaseBg: 'transparent',
    toggleBgHover: c.shapeOtherFieldHover,
    toggleBorderColor: c.lineNeutralPale,
    toggleBorderColorDisabled: c.lineNeutralPale,
    toggleBgFocus: 'linear-gradient(-180deg, #f1f1f1, #dedede)',
    toggleShadowColorError: c.lineErrorBold,
    toggleShadowColorWarning: c.lineWarningBold,
    toggleFocusShadowColor: c.lineAccentBold,
    toggleContainerBg: c.shapeOtherField,
    toggleHandleBg: c.shapeOtherBase,
    toggleHandleBoxShadow: `0 0 0 1px ${c.lineNeutralPale}`,
    toggleContainerBoxShadow: `inset 0 0 0 1px ${c.lineNeutralPale}`,
    toggleContainerBoxShadowHover: `inset 0 0 0 1px ${c.lineNeutralPaleHover}`,
    toggleHandleBgHover: c.shapeOtherBase,
    toggleHandleBoxShadowHover: `0 0 0 1px ${c.lineNeutralPale}`,
    toggleContainerBgHover: c.shapeOtherFieldHover,
    toggleContainerBoxShadowChecked: 'none',
    toggleHandleBoxShadowChecked: 'none',
    toggleHandleBgChecked: c.shapeInvertedNeutralHeavy,
    toggleBgChecked: c.shapeBoldAccent,
    toggleContainerBgChecked: c.shapeBoldAccent,
    toggleContainerBoxShadowCheckedHover: 'none',
    toggleContainerBgCheckedHover: c.shapeBoldAccentHover,
    toggleHandleBoxShadowCheckedHover: 'none',
    toggleHandleBgCheckedHover: c.shapeInvertedNeutralHeavyHover,
    toggleContainerBgDisabled: c.shapeOtherDisabled,
    toggleHandleBgDisabled: 'transparent',
    toggleContainerBoxShadowDisabled: `inset 0 0 0 1px ${c.lineNeutralFaint}`,
    toggleHandleBoxShadowDisabled: `0 0 0 1px ${c.lineNeutralFaint}`,
    toggleDisabledHandleBg: 'transparent',
    toggleBgDisabled: c.shapeOtherDisabled,
    toggleContainerBgDisabledChecked: c.shapeOtherAccentBoldDisabled,
    toggleHandleBgDisabledChecked: c.shapeInvertedNeutralHeavy,
    toggleContainerBoxShadowDisabledChecked: 'none',
    toggleHandleBoxShadowDisabledChecked: 'none',
    toggleBorderColorDisabledChecked: c.lineNeutralPale,
    popupDropShadow: 'drop-shadow(0px 32px 32px rgba(0, 0, 0, 0.08)) drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.12))',
    popupBoxShadow: '0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.12)',
    popupTextColor: c.textNeutralHeavy,
    popupBackground: c.surfaceHigh,
    inputBg: c.shapeOtherField,
    inputIconColor: c.textNeutralSoft,
    inputDisabledBg: c.shapeOtherDisabled,
    inputBorderColor: c.lineNeutralPale,
    inputBorderColorHover: c.lineNeutralPaleHover,
    inputBorderTopColor: c.lineNeutralPale,
    inputPlaceholderColor: c.textNeutralPale,
    inputPlaceholderColorLight: `color-mix(in srgb, ${c.textNeutralPale}, transparent 40%)`,
    inputBlinkColor: c.shapeFaintNeutralAlpha,
    inputColorScheme: 'light',
    checkboxTextColorDefault: c.textNeutralHeavy,
    checkboxTextColorDisabled: c.textNeutralPale,
    checkboxShadowDisabled: `0 0 0 1px ${c.lineNeutralFaint}`,
    checkboxBorder: 'none',
    checkboxShadow: `0 0 0 1px ${c.lineNeutralPale}`,
    checkboxShadowHover: `0 0 0 1px ${c.lineNeutralPaleHover}`,
    checkboxCheckedColor: c.shapeInvertedNeutralHeavy,
    checkboxBorderColorWarning: c.lineWarningBold,
    checkboxBorderColorError: c.lineErrorBold,
    checkboxCheckedHoverShadow: `0 0 0 1px ${c.shapeBoldAccentHover}`,
    checkboxCheckedShadow: `0 0 0 1px ${c.shapeBoldAccent}`,
    checkboxCheckedActiveShadow: `0 0 0 1px ${c.shapeBoldAccentPressed}`,
    checkboxBorderColorFocus: c.lineAccentBold,
    checkboxBg: c.shapeOtherField,
    checkboxHoverBg: c.shapeOtherFieldHover,
    checkboxActiveBg: c.shapeOtherFieldPressed,
    checkboxCheckedBg: c.shapeBoldAccent,
    checkboxBgDisabled: c.shapeOtherDisabled,
    checkboxCheckedHoverBg: c.shapeBoldAccentHover,
    checkboxCheckedActiveBg: c.shapeBoldAccentPressed,
    checkboxShadowActive: `0 0 0 1px ${c.lineNeutralPalePressed}`,
    textareaBg: c.shapeOtherField,
    textareaColor: c.textNeutralHeavy,
    textareaTextColorDisabled: c.textNeutralPale,
    textareaPlaceholderColorLight: `color-mix(in srgb, ${c.textNeutralPale}, transparent 40%)`,
    textareaPlaceholderColor: c.textNeutralPale,
    textareaPlaceholderColorDisabled: c.textNeutralPale,
    textareaShadow: 'none',
    textareaBorderColor: c.lineNeutralPale,
    textareaBorderTopColor: c.lineNeutralPale,
    textareaBorderColorFocus: c.lineAccentBold,
    textareaBorderColorHover: c.lineNeutralPaleHover,
    textareaBorderColorWarning: c.lineWarningBold,
    textareaBorderColorError: c.lineErrorBold,
    textareaDisabledBg: c.shapeOtherDisabled,
    textareaDisabledBorderColor: c.lineNeutralFaint,
    textareaCounterColor: c.textNeutralSoft,
    textareaCounterBg: 'transparent',
    textareaCounterErrorColor: c.textErrorHeavy,
    textareaCounterHelpIconColor: c.textNeutralHeavy,
    radioBgColor: c.shapeOtherField,
    radioHoverBg: c.shapeOtherFieldHover,
    radioActiveBg: c.shapeOtherFieldPressed,
    radioBorderColor: c.lineNeutralPale,
    radioBoxShadow: 'none',
    radioBorder: `1px solid ${c.lineNeutralPale}`,
    radioBorderColorFocus: c.lineAccentBold,
    radioBorderColorWarning: c.lineWarningBold,
    radioBorderColorError: c.lineErrorBold,
    radioHoverShadow: 'none',
    radioActiveShadow: 'none',
    radioCheckedBgColor: c.shapeBoldAccent,
    radioCheckedBorderColor: 'transparent',
    radioCheckedBulletColor: c.shapeInvertedNeutralHeavy,
    radioCheckedHoverBgColor: c.shapeBoldAccentHover,
    radioDisabledBg: c.shapeOtherDisabled,
    radioDisabledShadow: `0 0 0 1px ${c.lineNeutralFaint}`,
    radioCheckedDisabledBulletBg: c.textNeutralPale,
    tabTextColorDefault: c.textNeutralHeavy,
    tabColorFocus: c.lineAccentBold,
    tabColorError: c.shapeBoldError,
    tabColorWarning: c.shapeBoldWarning,
    tabColorSuccess: c.shapeBoldSuccess,
    tabColorPrimary: c.shapeBoldAccent,
    tabColorHover: c.lineNeutralPale,
    tabColorHoverError: `color-mix(in srgb, ${c.shapeBoldError}, transparent 50%)`,
    tabColorHoverWarning: `color-mix(in srgb, ${c.shapeBoldWarning}, transparent 50%)`,
    tabColorHoverSuccess: `color-mix(in srgb, ${c.shapeBoldSuccess}, transparent 50%)`,
    tabColorHoverPrimary: c.lineAccentPale,
    spinnerColor: c.customizableBoldRed,
    spinnerDimmedColor: c.customizableBoldGray,
    spinnerCaptionColor: c.textNeutralSoft,
    switcherTextColor: c.textNeutralHeavy,
    switcherBtnDisabledBorderColor: c.lineNeutralPale,
    switcherButtonDisabledBorderColor: c.lineNeutralPale,
    scrollContainerScrollBarColor: c.shapeSoftNeutralAlpha,
    scrollContainerScrollBarInvertColor: c.shapeInvertedNeutralSoftAlpha,
    passwordInputVisibilityIconColor: c.textNeutralHeavy,
    passwordInputVisibilityIconOpacity: '0.64',
    passwordInputVisibilityIconHoverColor: c.textNeutralHeavy,
    passwordInputVisibilityIconHoverOpacity: '1',
    globalLoaderColor: c.shapeBoldBrandOriginal,
    fileUploaderBg: '',
    fileUploaderUploadButtonBg: 'transparent',
    fileUploaderTextColorDefault: c.textNeutralHeavy,
    fileUploaderBorderColor: c.lineNeutralPale,
    fileUploaderDisabledBorder: `1px ${'dashed'} ${c.lineNeutralFaint}`,
    fileUploaderBorderColorFocus: c.lineAccentBold,
    fileUploaderLinkColor: c.textNeutralHeavy,
    fileUploaderAfterLinkColor: c.textNeutralSoft,
    fileUploaderIconColor: c.textNeutralPale,
    fileUploaderIconHoverColor: c.textNeutralHeavy,
    fileUploaderBorderColorError: c.lineErrorBold,
    fileUploaderBorderColorWarning: c.lineWarningBold,
    fileUploaderDisabledBg: c.shapeOtherDisabled,
    fileUploaderDisabledBorderColor: c.lineNeutralFaint,
    fileUploaderDisabledTextColor: c.textNeutralPale,
    fileUploaderDisabledLinkColor: c.textNeutralPale,
    fileUploaderDisabledIconColor: c.textNeutralPale,
    fileUploaderHoveredBg: c.shapeOtherBacklessHover,
    fileUploaderHoveredBorderColor: 'transparent',
    fileUploaderDragOverBorderColor: c.lineAccentBold,
    clearCrossIconColor: c.textNeutralSoft,
    clearCrossIconHoverColor: c.textNeutralHeavy,
    closeBtnIconColor: c.textNeutralPale,
    closeBtnIconDisabledColor: c.textNeutralPale,
    closeBtnIconHoverColor: c.textNeutralHeavy,
    validationsTextColorError: c.textErrorHeavy,
    validationsTextColorWarning: c.textWarningHeavy,
    sideMenuBgColor: c.surfaceLow,
    sideMenuProductColor: c.shapeBoldBrandOriginal,
    sideMenuNotificationsMarkerBg: c.shapeHeavyNeutral,
    addonsUserAvatarBorderColor: c.shapeHeavyNeutral,
    addonsUserAvatarColor: c.shapeHeavyNeutral,
    sideMenuItemActiveBg: c.shapeOtherBase,
    sideMenuItemHoverBg: c.shapeOtherBacklessHover,
  });

  return (
    <div data-colors-controls>
      <div className={styles.filterRow}>
        <Gapped>
          <label htmlFor="example-brand">Brand</label>
          <Select
            id="example-brand"
            items={colorOptions}
            value={brand}
            width={140}
            onValueChange={setBrand}
            renderValue={renderBrandItem}
            renderItem={renderBrandItem}
          />

          {brand === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customBrandColor}
              onValueChange={handleCustomBrandColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped>
          <label htmlFor="example-accent">Accent</label>
          <Select
            id="example-accent"
            width={140}
            items={baseAccentOptions}
            value={accent}
            onValueChange={setAccent}
            renderValue={renderAccentItemValue}
            renderItem={renderAccentMenuItem}
          />

          {accent === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customAccentColor}
              onValueChange={handleCustomAccentColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>
        <Gapped style={{ marginLeft: 'auto' }}>
          <label htmlFor="example-theme">Theme</label>

          <Select
            id="example-theme"
            width={140}
            items={['light', 'dark']}
            value={colorTheme}
            onValueChange={setColorTheme}
            renderValue={renderThemeItem}
            renderItem={renderThemeItem}
          />
        </Gapped>
      </div>
      <ThemeContext.Provider value={theme}>
        <div style={{ color: c.textNeutralHeavy, background: c.surfaceHigh }}>
          <div className="wrapper">
            <style>{`
.wrapper {
  display: flex;
  height: 100%;
}

.wrapper > * {
  height: auto;
}

.container {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  padding-top: 24px;
  height: 100%;
  width: 100%;
  color: ${c.textNeutralHeavy};
  background: ${c.surfaceBase};
}

.header {
  display: flex;
  align-items: center;
}

.header__title {
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
}

.panel {
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;

  margin-left: 40px;
  padding: 16px;
  border-radius: 8px;

  color: ${c.textOnBrandOriginalHeavy};
  background-color: ${c.shapeBoldBrandOriginal};
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 0 48px 48px;
}

.item {
  display: flex;
  gap: 8px;
}

.item__title {
  box-sizing: border-box;
  width: 88px;
  height: 40px;
  padding: 9px 0;

  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
}

.item__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item__toggle {
  box-sizing: border-box;
  height: 40px;
  padding: 9px 0;
}

.item__text {
  width: 376px;
  margin: 0;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

.footer {
  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;

  padding: 0 72px 0 48px;
  background-color: ${c.surfaceBase};
  border-top: 1px solid ${c.lineNeutralPale};
}

.footer__controls {
  display: flex;
  gap: 8px;

  padding: 16px 0;
}

.footer__warning-panel {
  display: flex;
  gap: 8px;

  margin-left: 16px;
  padding: 13px 16px;
  border-radius: 8px;

  background-color: ${c.shapeFaintWarning};
}
      `}</style>
            <SideMenu>
              <SideMenu.Header
                konturLogo={<Kontur color={c.textNeutralHeavy} />}
                productLogo={<Product color={c.shapeBoldBrandOriginal} />}
              />
              <SideMenu.Body>
                <SideMenu.Item icon={<IconDocTextRegular24 />} caption="Документы" />
                <SideMenu.Item icon={<IconPeople2Regular24 />} caption="Команда" />
                <SideMenu.Item icon={<IconCommentRectTextRegular24 />} caption="Сообщения" marker={1} />
                <SideMenu.Item icon={<IconMarketShoppingBasketRegular24 />} caption="Товары" />
              </SideMenu.Body>
              <SideMenu.Footer>
                <SideMenu.Organisations icon={<IconStackHDownRegular24 />} />
                <SideMenu.Item icon={<IconSettingsGearRegular24 />} caption="Настройки" />
                <SideMenu.Avatar userName="Кирилл Лаптев" />
              </SideMenu.Footer>
            </SideMenu>

            <div className="container">
              <header className="header">
                <Button use="text" icon={<IconArrowALeftRegular24 color={c.textNeutralHeavy} />} size="medium" />
                <span className="header__title">Иванов Иван Иванович</span>
              </header>
              <div className="panel">
                <IconNaturePlantFlowerSolid20 />
                Теперь появилась возможность разукрасить интерфейс!
              </div>
              <main className="content">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <Tabs.Tab id="tab-0">Настройки доступа</Tabs.Tab>
                  <Tabs.Tab id="tab-1">Безопасность</Tabs.Tab>
                  <Tabs.Tab id="tab-2">Подписки</Tabs.Tab>
                  <Tabs.Tab id="tab-3">Документы</Tabs.Tab>
                </Tabs>
                <div className="item">
                  <span className="item__title">Почта</span>
                  <Input size="medium" width={288} />
                </div>
                <div className="item">
                  <span className="item__title">Доступ</span>
                  <div className="item__body">
                    <div className="item__toggle">
                      <Toggle size="medium">Разрешить</Toggle>
                    </div>
                    <p className="item__text">
                      Мы обновили анкету участника, чтобы встречи становились ещё комфортнее.{' '}
                      <Link>Подробнее в статье</Link>
                    </p>
                  </div>
                </div>
                <div className="item">
                  <span className="item__title">Уровень</span>
                  <RadioGroup value={activeRadio} onValueChange={setActiveRadio}>
                    <Gapped vertical gap={0}>
                      <Radio size="medium" value={1}>
                        Администратор
                      </Radio>
                      <Radio size="medium" value={2}>
                        Пользователь
                      </Radio>
                      <Radio size="medium" value={3}>
                        Только чтение
                      </Radio>
                    </Gapped>
                  </RadioGroup>
                </div>
                <div className="item">
                  <span className="item__title">Другое</span>
                  <Checkbox size="medium" checked={checked} onValueChange={setChecked}>
                    Входить по умолчанию
                  </Checkbox>
                  <Tooltip
                    render={() => (
                      <div style={{ width: 200 }}>При входе в сервис сотруднику не придётся проходить авторизацию.</div>
                    )}
                  >
                    <IconQuestionCircleLight20 color={c.textNeutralHeavy} />
                  </Tooltip>
                </div>
              </main>
              <footer className="footer">
                <div className="footer__controls">
                  <Button use="primary" size="large">
                    Сохранить
                  </Button>
                  <Button use="backless" size="large">
                    Отменить
                  </Button>
                  <div className="footer__warning-panel">
                    <IconWarningTriangleSolid20 color={c.shapeBoldWarning} />
                    Укажите все данные для сохранения
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

ColorsExampleStory.storyName = 'Пример интерфейса';

/**
 * <a href="https://chromewebstore.google.com/detail/kontur-ui/oiekpgnfbdafebmcjlbaapekngfnjfom?authuser=0&hl=en&pli=1" target="_blank" style="font-size: 14px; padding: 8px 24px; border-radius: 8px; background: #F6F8FA; display: flex; align-items: center; gap: 12px;">
    <img width="24" height="24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/60px-Google_Chrome_icon_%28February_2022%29.svg.png" alt=""> Chrome Extension для удобного копирования из Figma →
  </a>
 * Токены цветов состоят из 6 основных групп:
 * - **text** — переменные для текстов и иконок, которые являются частью текста
 * - **shape** — подложки, плашки, фоны и заливки
 * - **line** — линии, разделители, обводки, подчеркивания
 * - **surface** — крупные контентные области; поверхности, которые образуют лейаут
 * - **illustration** — иллюстрации, промо-материалы и всё связанное с коммуникационным дизайном
 * - **customizable** — произвольные цвета из палитры для схем/графиков и других сценариев
 *
 * ---
 *
 * Для покраски элемента необходимо подбирать токены по заложенному в них смыслу. Подробнее в [устройстве семантики →](https://www.figma.com/design/XVgPCAAFhEbIiQDDznkdat/%E2%9A%A1%EF%B8%8F-Kontur-Colors-2.0?node-id=6256-369539&t=t9J25uypIjGTMtLQ-4)
 */
export const ColorsPaletteStory = () => {
  const GROUPING_ROOTS = [
    'text',
    'texInverted',
    'textConst',
    'textOnAccent',
    'textOnBrand',
    'shape',
    'shapeInverted',
    'shapeConst',
    'line',
    'lineInverted',
    'lineConst',
    'surface',
    'illustration',
    'customizable',
  ];

  const generateTokenList = (tokens: any): TokenPair[] => {
    const { light, dark } = tokens;
    const tokenList: TokenPair[] = [];

    for (const key in light) {
      if (dark[key] && typeof light[key] === 'string' && typeof dark[key] === 'string') {
        tokenList.push({
          key: key,
          value: {
            light: light[key],
            dark: dark[key],
          },
        });
      }
    }

    return tokenList;
  };

  const extractRootFromCamelCase = (key: string, roots: string[]): string | null => {
    const sortedRoots = [...roots].sort((a, b) => b.length - a.length);

    for (const root of sortedRoots) {
      if (key === root) {
        return root;
      }
      const rootEndIndex = root.length;
      if (key.startsWith(root) && key.length > rootEndIndex) {
        const nextChar = key[rootEndIndex];

        if (nextChar === nextChar.toUpperCase() && nextChar !== nextChar.toLowerCase()) {
          return root;
        }
      }
    }
    return null;
  };

  const groupTokensByRoot = (tokens: TokenPair[]): Record<string, TokenPair[]> => {
    const groupedByRoot: Record<string, TokenPair[]> = {};
    const allRoots = GROUPING_ROOTS;

    const sortedTokens = tokens.sort((a, b) => a.key.localeCompare(b.key));

    for (const token of sortedTokens) {
      const tokenKey = token.key;
      let rootKey = 'other';

      const foundRoot = extractRootFromCamelCase(tokenKey, allRoots);

      if (foundRoot) {
        rootKey = foundRoot;
      } else {
        const match = tokenKey.match(/^[a-z]+/);
        if (match) {
          rootKey = match[0];
        } else if (tokenKey.includes('.')) {
          rootKey = tokenKey.split('.')[0];
        }
      }

      if (!rootKey || rootKey.length === 0) {
        rootKey = 'other';
      }

      if (!groupedByRoot[rootKey]) {
        groupedByRoot[rootKey] = [];
      }
      groupedByRoot[rootKey].push(token);
    }

    const finalGrouped: Record<string, TokenPair[]> = {};

    for (const key of GROUPING_ROOTS) {
      if (groupedByRoot[key]) {
        finalGrouped[key] = groupedByRoot[key];
        delete groupedByRoot[key];
      }
    }

    for (const key in groupedByRoot) {
      if (groupedByRoot[key].length > 0) {
        finalGrouped[key] = groupedByRoot[key];
      }
    }

    return finalGrouped;
  };

  const styles: Record<string, string> = {
    colors: css`
      display: flex;
      flex-direction: column;
      height: 900px;
      min-height: 400px;
      max-height: calc(100vh - 120px);
      overflow-y: scroll;
    `,
    colorGroup: css`
      margin-bottom: 64px;
    `,
    filterRow: css`
      position: sticky;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 16px;
      width: calc(100% - 32px);
      top: 0;
      background: white;
      font-size: 14px;
    `,
    headerRow: css`
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% - 32px);
      padding: 4px 16px 4px;
      font-weight: 600;
      color: #222;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 57px;
      z-index: 10;
      background: white;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.2;
    `,
    dropdownRow: css`
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% - 16px);
      padding: 3px 8px;
      margin: 0 8px;
      border-radius: 8px;
      cursor: pointer;
      background: none;
      border: none;
      text-align: left;
      transition: background 0.1s ease;
      font-family: inherit;
      &:hover {
        background: rgba(0, 0, 0, 0.06);
      }
      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    `,
    colorName: css`
      flex: 1;
    `,
    colorTileWrapper: css`
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      width: 140px;
    `,
    colorTile: css`
      height: 32px;
      width: 32px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      border-radius: 8px;
      flex-shrink: 0;
    `,
    colorHex: css`
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      color: #8b8b8b;
    `,
    groupHeader: css`
      position: sticky;
      top: 62px;
      width: 50%;
      z-index: 10;
      background: white;
      font-size: 14px;
      line-height: 1;
      padding: 2px 16px;
      font-weight: bold;
    `,
    controls: css`
      position: sticky;
      z-index: 10;
      bottom: 0;
      padding: 8px;
      background: white;
      box-shadow: 0 -1px rgba(0, 0, 0, 0.15);
      margin-top: auto;
    `,
  };

  const defaultColorOptions = Object.keys(brandSwatch);
  const defaultBrandColor = 'red';
  const defaultAccentColor = 'gray';

  const colorOptions = [...defaultColorOptions, 'custom'];
  const baseAccentOptions = ['gray', 'brand', 'custom'];

  const colorFormatOptions = ['Web (hex/rgba)', 'Web (oklch)', 'iOS/Android (hex-aarrggbb)'];

  const [brand, setBrand] = React.useState(defaultBrandColor);
  const [accent, setAccent] = React.useState(defaultAccentColor);
  const [filter, setFilter] = React.useState('');
  const [colorFormat, setColorFormat] = React.useState(colorFormatOptions[0]);

  const [customBrandColor, setCustomBrandColor] = React.useState('#FFDD2D');
  const [customAccentColor, setCustomAccentColor] = React.useState('#FFDD2D');

  const handleCustomBrandColorValueChange = React.useCallback((newColor: string) => {
    setCustomBrandColor(newColor);
  }, []);

  const handleCustomAccentColorValueChange = React.useCallback((newColor: string) => {
    setCustomAccentColor(newColor);
  }, []);

  const getColorsFormat = (tokenKey: string) => {
    const kebabCaseKey = tokenKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    return {
      CSS: `var(--k-color-${kebabCaseKey})`,
      SCSS: `$color-${kebabCaseKey}`,
      Less: `@color-${kebabCaseKey}`,
      'JS/TS': `colors.${tokenKey}`,
      'Android Compose': `KonturTheme.colors.${tokenKey}`,
    };
  };

  const copyColor = (colorValue: string) => {
    window.navigator.clipboard.writeText(colorValue);
    Toast.push('Цвет скопирован', null, 1000);
  };

  const getOutputFormatParam = (format: string): ColorFormat => {
    switch (format) {
      case 'iOS/Android (hex-aarrggbb)':
        return 'hex-aarrggbb';
      case 'Web (oklch)':
        return 'oklch';
      case 'Web (hex/rgba)':
      default:
        return 'hex/rgba';
    }
  };

  const outputFormatParam = getOutputFormatParam(colorFormat);

  const safeBrandColor = React.useMemo(() => {
    if (brand !== 'custom') {
      return brand;
    }
    return customBrandColor.trim() !== '' ? customBrandColor : defaultBrandColor;
  }, [brand, customBrandColor]);

  const safeAccentColor = React.useMemo(() => {
    if (accent !== 'custom') {
      return accent;
    }
    return customAccentColor.trim() !== '' ? customAccentColor : defaultAccentColor;
  }, [accent, customAccentColor]);

  const isAccentDisabled = (accentValue: string, currentBrand: string) => {
    return accentValue === 'brand' && (currentBrand === 'red' || currentBrand === 'orange');
  };

  const getBrandColorForSwatch = React.useCallback(() => {
    if (brand === 'custom') {
      return customBrandColor.trim() !== ''
        ? customBrandColor
        : brandSwatch[defaultBrandColor as keyof typeof brandSwatch];
    }
    return brandSwatch[brand as keyof typeof brandSwatch];
  }, [brand, customBrandColor]);

  const renderAccentItemValuePalette = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customAccentColor.trim() !== '' ? customAccentColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    const color = value === 'gray' ? '#3d3d3d' : getBrandColorForSwatch();
    return renderColorItem(color, value);
  };

  const renderAccentMenuItemPalette = (value: string) => {
    const content = renderAccentItemValuePalette(value);
    return (
      <div key={value} style={{ opacity: isAccentDisabled(value, brand) ? 0.4 : 1 }}>
        {content}
      </div>
    );
  };

  const handleBrandChange = React.useCallback((newBrand: string) => {
    setBrand(newBrand);
  }, []);

  React.useEffect(() => {
    if (isAccentDisabled(accent, brand)) {
      setAccent('gray');
      Toast.push('Акцент brand недоступен для red и orange', null, 3000);
    }
  }, [brand, accent]);

  const effectiveAccentColor = React.useMemo(() => {
    if (isAccentDisabled(safeAccentColor, safeBrandColor)) {
      return 'gray';
    }
    return safeAccentColor;
  }, [safeBrandColor, safeAccentColor]);

  let tokenList;

  try {
    tokenList = generateTokenList({
      light: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'light',
        format: outputFormatParam,
      }),
      dark: getColors({
        brand: safeBrandColor,
        accent: effectiveAccentColor,
        theme: 'dark',
        format: outputFormatParam,
      }),
    });
  } catch (error) {
    tokenList = generateTokenList({
      light: getColors({
        brand: '#FFDD2D',
        accent: '#FFDD2D',
        theme: 'light',
        format: outputFormatParam,
      }),
      dark: getColors({
        brand: '#FFDD2D',
        accent: '#FFDD2D',
        theme: 'dark',
        format: outputFormatParam,
      }),
    });
  }

  const filterTokens = (tokens: TokenPair[]) => {
    if (!filter) return tokens;

    const filterLower = filter.toLowerCase();

    return tokens.filter((token) => {
      if (token.key.toLowerCase().includes(filterLower)) {
        return true;
      }

      if (
        token.value.light.toLowerCase().includes(filterLower) ||
        token.value.dark.toLowerCase().includes(filterLower)
      ) {
        return true;
      }

      const figmaNameToToken = (figmanName: string): string => {
        const prefixMatch = figmanName.match(/^(Hover|Pressed)\//);

        const [processedString, extractedPrefix] = prefixMatch
          ? [
              figmanName.substring(prefixMatch[0].length),
              prefixMatch[1].charAt(0).toUpperCase() + prefixMatch[1].slice(1),
            ]
          : [figmanName, ''];

        const parts = processedString.split(/[/ ]+/).filter(Boolean);

        const baseCamelCaseString = parts.reduce((acc, part, index) => {
          return (
            acc +
            (index === 0 ? part.charAt(0).toLowerCase() + part.slice(1) : part.charAt(0).toUpperCase() + part.slice(1))
          );
        }, '');

        return baseCamelCaseString + extractedPrefix;
      };

      if (token.key.includes(figmaNameToToken(filter))) {
        return true;
      }

      return false;
    });
  };

  const groupedByRoot = groupTokensByRoot(filterTokens(tokenList));

  const renderColorItem = (color: string, text: string) => {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            flexShrink: 0,
            background: color,
            width: 12,
            height: 12,
            borderRadius: 4,
          }}
        />
        {text}
      </div>
    );
  };

  const renderBrandItem = (value: string) => {
    if (value === 'custom') {
      const colorToDisplay = customBrandColor.trim() !== '' ? customBrandColor : '#999';
      return renderColorItem(colorToDisplay, '#custom-hex');
    }
    return renderColorItem(brandSwatch[value as keyof typeof brandSwatch], value);
  };

  return (
    <div className={styles.colors} data-colors-controls>
      <div className={styles.filterRow}>
        <Gapped>
          <label htmlFor="palette-brand">Brand</label>
          <Select
            id="palette-brand"
            items={colorOptions}
            value={brand}
            width={140}
            onValueChange={handleBrandChange}
            renderValue={renderBrandItem}
            renderItem={renderBrandItem}
          />
          {brand === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customBrandColor}
              onValueChange={handleCustomBrandColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped>
          <label htmlFor="palette-accent">Accent</label>
          <Select
            id="palette-accent"
            width={140}
            items={baseAccentOptions}
            value={accent}
            onValueChange={setAccent}
            renderValue={renderAccentItemValuePalette}
            renderItem={renderAccentMenuItemPalette}
          />
          {accent === 'custom' && (
            <Input
              maxLength={7}
              width={80}
              value={customAccentColor}
              onValueChange={handleCustomAccentColorValueChange}
              placeholder="#RRGGBB"
            />
          )}
        </Gapped>

        <Gapped style={{ paddingLeft: 16, marginLeft: 'auto' }}>
          <Gapped>
            <label htmlFor="palette-format">Format</label>
            <Select
              width={238}
              id="palette-format"
              items={colorFormatOptions}
              value={colorFormat}
              onValueChange={setColorFormat}
            />
          </Gapped>
        </Gapped>
      </div>
      <div className={styles.headerRow}>
        <span className={styles.colorName}>Token</span>
        <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <span>Light</span>
        </div>
        <div className={styles.colorTileWrapper} style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <span>Dark</span>
        </div>
      </div>
      {Object.entries(groupedByRoot).map(([rootKey, tokens], i) => (
        <React.Fragment key={rootKey}>
          <div className={styles.groupHeader} style={{ margin: i !== 0 ? '24px 0 16px' : '12px 0 0' }}>
            {rootKey}
          </div>
          {tokens.map(({ key, value }) => {
            const convertHexAlphaToWebFormat = (color: string) =>
              color.length === 9 ? '#' + color.slice(3, 9) + color.slice(1, 3) : color;
            const displayLightValue = value?.light;
            const displayDarkValue = value?.dark;

            return (
              <DropdownMenu
                key={key}
                width="100%"
                caption={
                  <button className={styles.dropdownRow}>
                    <span className={styles.colorName}>{key}</span>
                    <div className={styles.colorTileWrapper}>
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(displayLightValue)
                              : value?.light,
                        }}
                      />
                      <span className={styles.colorHex}>{displayLightValue}</span>
                    </div>
                    <div
                      className={styles.colorTileWrapper}
                      style={{
                        background: '#3d3d3d',
                        borderRadius: 4,
                        boxShadow: '0 0 0 2px #3d3d3d',
                      }}
                    >
                      <div
                        className={styles.colorTile}
                        style={{
                          backgroundColor:
                            colorFormat === 'iOS/Android (hex-aarrggbb)'
                              ? convertHexAlphaToWebFormat(displayDarkValue)
                              : value?.dark,
                        }}
                      />
                      <span className={styles.colorHex} style={{ color: 'white' }}>
                        {displayDarkValue}
                      </span>
                    </div>
                  </button>
                }
              >
                <MenuHeader>Скопировать переменную</MenuHeader>
                {Object.entries(getColorsFormat(key)).map(([lang, colorVar]) => (
                  <MenuItem key={lang} onClick={() => copyColor(colorVar)} comment={lang}>
                    <div style={{ minWidth: 270 }}>{colorVar}</div>
                  </MenuItem>
                ))}
              </DropdownMenu>
            );
          })}
        </React.Fragment>
      ))}
      <div className={styles.controls}>
        <Input
          width="50%"
          value={filter}
          onValueChange={setFilter}
          placeholder="Введите название токена или цвет"
          rightIcon={<SearchLoupeIcon16Regular />}
        />
      </div>
    </div>
  );
};

ColorsPaletteStory.storyName = 'Список всех токенов';
