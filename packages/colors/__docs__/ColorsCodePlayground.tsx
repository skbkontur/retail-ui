import React from 'react';
import { IconWeatherMoonRegular16 } from '@skbkontur/icons/IconWeatherMoonRegular16';
import { IconWeatherSunRegular16 } from '@skbkontur/icons/IconWeatherSunRegular16';
import { Link } from '@skbkontur/react-ui/components/Link';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Select } from '@skbkontur/react-ui/components/Select';
import { SingleToast } from '@skbkontur/react-ui/components/SingleToast';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Tabs } from '@skbkontur/react-ui/components/Tabs';

import { brand as brandSwatch } from '../lib/consts/default-swatch.js';
import { camelCaseToKebabCase } from '../lib/utils/format-variable.js';

const kw = (t: string) => `<span class="token-kw">${t}</span>`;
const val = (t: string) => `<span class="token-val">"${t}"</span>`;
const tag = (t: string) => `<span class="token-tag">${t}</span>`;
const prop = (t: string) => `<span class="token-prop">${t}</span>`;
const selector = (t: string) => `<span class="token-tag">${t}</span>`;
const cssProp = (t: string) => `<span class="token-prop">${t}</span>`;
const cssVal = (t: string) => `<span class="token-val">${t}</span>`;

const toKebab = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const copyToClipboard = (snippet: string) => {
  const plainText = snippet
    .replace(/<[^>]*>?/gm, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  navigator.clipboard.writeText(plainText);
  SingleToast.push('Код скопирован');
};

const renderBrandOption = (id: string) => (
  <div className="select-item">
    <div className="brand-swatch" style={{ background: brandSwatch[id as keyof typeof brandSwatch] || id }} />
    <span>{id}</span>
  </div>
);

const CopyBlock = ({ code }: { code: string }) => (
  <div className="copy-container">
    <pre className="copy-pre" dangerouslySetInnerHTML={{ __html: code }} />
    <button className="copy-btn" onClick={() => copyToClipboard(code)}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M5 2V1H11V2H5ZM4 2V3H12V2H13V15H3V2H4ZM5 4V13H11V4H5Z" fill="#AAA" />
      </svg>
    </button>
  </div>
);

const ProductKontur = () => {
  const [mainTheme, setMainTheme] = React.useState('light');
  const [mainBrand, setMainBrand] = React.useState('mint');
  const [mainAccent, setMainAccent] = React.useState('brand');
  const [extraSchemes, setExtraSchemes] = React.useState<Array<{ brand: string; accent: string; theme: string }>>([]);
  const [format, setFormat] = React.useState<'css' | 'scss' | 'less' | 'ts'>('css');

  const brandIds = Object.keys(brandSwatch);
  const restrictedBrands = ['red', 'orange'];

  const validateAccent = (brand: string, accent: string) => {
    return restrictedBrands.includes(brand) ? 'gray' : accent;
  };

  React.useEffect(() => {
    setMainAccent((prev) => validateAccent(mainBrand, prev));
  }, [mainBrand]);

  const getConnectSnippet = () => {
    const all = [{ brand: mainBrand, accent: mainAccent }, ...extraSchemes];
    const unique = all.filter((v, i, a) => a.findIndex((t) => t.brand === v.brand && t.accent === v.accent) === i);
    return unique
      .map(
        (s) => `${kw('import')} ${val(`@skbkontur/colors/tokens/brand-${toKebab(s.brand)}_accent-${s.accent}.css`)};`
      )
      .join('\n');
  };

  const getAttrSnippet = () => {
    const themeAttr = mainTheme === 'dark' ? ` ${prop('data-k-theme')}=${val('dark')}` : '';
    const mainAttr = `${prop('data-k-brand')}=${val(camelCaseToKebabCase(mainBrand))} ${prop('data-k-accent')}=${val(
      mainAccent
    )}${themeAttr}`;

    let res = `${tag('&lt;html')} ${mainAttr}${tag('&gt;')}`;

    if (extraSchemes.length > 0) {
      res = `${tag('&lt;div')} ${mainAttr}${tag('&gt;')}\n  ... \n\n`;
      extraSchemes.forEach((s) => {
        const sTheme = s.theme === 'dark' ? ` ${prop('data-k-theme')}=${val('dark')}` : '';
        res += `  ${tag('&lt;div')} ${prop('data-k-brand')}=${val(s.brand)} ${prop('data-k-accent')}=${val(
          s.accent
        )}${sTheme}${tag('&gt;')}\n    Дополнительная схема\n  ${tag('&lt;/div&gt;')}\n`;
      });
      res += tag('&lt;/div&gt;');
    }
    return res;
  };

  const getUseSnippet = () => {
    if (format === 'css') {
      return `${selector('.block')} {\n  ${cssProp('color')}: ${cssVal(
        'var(--k-color-text-neutral-heavy)'
      )};\n  ${cssProp('background')}: ${cssVal('var(--k-color-shape-bold-accent)')};\n}`;
    }
    if (format === 'scss') {
      return `${kw('@use')} ${val('@skbkontur/colors/colors.scss')} ${kw('as *')};\n\n${selector(
        '.block'
      )} {\n  ${cssProp('color')}: ${cssVal('$color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '$color-shape-bold-accent'
      )};\n}`;
    }
    if (format === 'less') {
      return `${kw('@import')} ${val('@skbkontur/colors/colors.less')};\n\n${selector('.block')} {\n  ${cssProp(
        'color'
      )}: ${cssVal('@color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '@color-shape-bold-accent'
      )};\n}`;
    }
    return `${kw('import')} * ${kw('as')} colors ${kw('from')} ${val('@skbkontur/colors')};\n\n${kw(
      'const'
    )} styles = { ${cssProp('background')}: colors.shapeBoldAccent };`;
  };

  return (
    <Gapped vertical gap={24}>
      <div>
        <h3 className="section-title">1. Настройка цветовой схемы</h3>
        <div className="section-desc">
          Выберите брендовый и акцентные цвета. Для сценариев с рекламными врезками можно добавить несколько цветовых
          схем
        </div>
        <Gapped gap={12}>
          <div className="field-container">
            <span className="field-label">Brand</span>
            <Select
              width={160}
              value={mainBrand}
              onValueChange={setMainBrand}
              items={brandIds}
              renderItem={renderBrandOption}
              renderValue={renderBrandOption}
            />
          </div>
          <div className="field-container">
            <span className="field-label">Accent</span>
            <Select
              width={100}
              items={restrictedBrands.includes(mainBrand) ? ['gray'] : ['gray', 'brand']}
              value={mainAccent}
              onValueChange={setMainAccent}
            />
          </div>
          <div className="field-container">
            <span className="field-label">Theme</span>
            <Select
              width={100}
              items={['light', 'dark']}
              value={mainTheme}
              onValueChange={setMainTheme}
              renderItem={(i) => (
                <div className="select-item">
                  {i === 'light' ? <IconWeatherSunRegular16 /> : <IconWeatherMoonRegular16 />}
                  {i}
                </div>
              )}
            />
          </div>
        </Gapped>
        <div className="extra-schemes-list">
          {extraSchemes.map((s, i) => (
            <div key={i} className="extra-row">
              <Select
                width={160}
                value={s.brand}
                items={brandIds}
                onValueChange={(v) => {
                  const n = [...extraSchemes];
                  n[i].brand = v;
                  n[i].accent = validateAccent(v, n[i].accent);
                  setExtraSchemes(n);
                }}
                renderItem={renderBrandOption}
                renderValue={renderBrandOption}
              />
              <Select
                width={100}
                items={restrictedBrands.includes(s.brand) ? ['gray'] : ['gray', 'brand']}
                value={s.accent}
                onValueChange={(v) => {
                  const n = [...extraSchemes];
                  n[i].accent = v;
                  setExtraSchemes(n);
                }}
              />
              <Select
                width={100}
                items={['light', 'dark']}
                value={s.theme}
                onValueChange={(v) => {
                  const n = [...extraSchemes];
                  n[i].theme = v;
                  setExtraSchemes(n);
                }}
              />
              <div className="remove-btn" onClick={() => setExtraSchemes(extraSchemes.filter((_, idx) => idx !== i))}>
                ×
              </div>
            </div>
          ))}
          <div className="add-btn-wrapper">
            <Link
              onClick={() => {
                const used = [mainBrand, ...extraSchemes.map((s) => s.brand)];
                const next = brandIds.find((id) => !used.includes(id)) || brandIds[0];
                setExtraSchemes([...extraSchemes, { brand: next, accent: 'gray', theme: 'light' }]);
              }}
            >
              + Добавить схему
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h3 className="section-title">2. Подключение переменных</h3>
        <div className="section-desc">Подключите CSS с цветовыми схемами в точку входа приложения</div>
        <CopyBlock code={getConnectSnippet()} />
      </div>

      <div>
        <h3 className="section-title">3. Атрибуты на контейнере</h3>
        <div className="section-desc">Укажите data-атрибуты на &lt;html&gt; или &lt;body&gt;</div>
        <CopyBlock code={getAttrSnippet()} />
      </div>

      <div>
        <h3 className="section-title">4. Использование переменных</h3>
        <div className="section-desc">
          Выберите формат токенов для использования в ваших стилях (компоненты Kontur UI перекрасятся сами)
        </div>
        <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
          <Tabs.Tab id="css">CSS</Tabs.Tab>
          <Tabs.Tab id="scss">SCSS</Tabs.Tab>
          <Tabs.Tab id="less">LESS</Tabs.Tab>
          <Tabs.Tab id="ts">JS/TS</Tabs.Tab>
        </Tabs>
        <div style={{ marginTop: 16 }}>
          <CopyBlock code={getUseSnippet()} />
        </div>
      </div>
    </Gapped>
  );
};

const ProductOnPrem = () => {
  const [mainTheme, setMainTheme] = React.useState('light');
  const [customHex, setCustomHex] = React.useState('#FFDD2D');
  const [mainAccent, setMainAccent] = React.useState('brand');
  const [format, setFormat] = React.useState<'css' | 'scss' | 'less' | 'ts'>('css');

  const getConnectSnippet = () => `${kw('import')} { getColors } ${kw('from')} ${val('@skbkontur/colors/get-colors')};

${kw('const')} css = ${kw('getColors')}({
  brand: ${val(customHex)},
  accent: ${val(mainAccent)},
  theme: ${val('all')},
  output: ${val('css')}
});

${kw('const')} style = document.${kw('createElement')}(${val('style')});
style.innerHTML = css;
document.head.${kw('appendChild')}(style);`;

  const getAttrSnippet = () => {
    const themeAttr = mainTheme === 'dark' ? ` ${prop('data-k-theme')}=${val('dark')}` : '';
    return `${tag('&lt;html')} ${prop('data-k-brand')}=${val(customHex)} ${prop('data-k-accent')}=${val(
      mainAccent
    )}${themeAttr}${tag('&gt;')}`;
  };

  const getUseSnippet = () => {
    if (format === 'css') {
      return `${selector('.block')} {\n  ${cssProp('color')}: ${cssVal(
        'var(--k-color-text-neutral-heavy)'
      )};\n  ${cssProp('background')}: ${cssVal('var(--k-color-shape-bold-accent)')};\n}`;
    }
    if (format === 'scss') {
      return `${kw('@use')} ${val('@skbkontur/colors/colors.scss')} ${kw('as *')};\n\n${selector(
        '.block'
      )} {\n  ${cssProp('color')}: ${cssVal('$color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '$color-shape-bold-accent'
      )};\n}`;
    }
    if (format === 'less') {
      return `${kw('@import')} ${val('@skbkontur/colors/colors.less')};\n\n${selector('.block')} {\n  ${cssProp(
        'color'
      )}: ${cssVal('@color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '@color-shape-bold-accent'
      )};\n}`;
    }
    return `${kw('import')} * ${kw('as')} colors ${kw('from')} ${val('@skbkontur/colors')};\n\n${kw(
      'const'
    )} styles = { ${cssProp('background')}: colors.shapeBoldAccent };`;
  };

  return (
    <Gapped vertical gap={24}>
      <div>
        <h3 className="section-title">1. Настройка цветовой схемы</h3>
        <div className="section-desc">Укажите HEX-код, из которого сформируются светлые и темные темы</div>
        <Gapped gap={12}>
          <div className="field-container">
            <span className="field-label">Brand</span>
            <Input
              width={160}
              value={customHex}
              onValueChange={setCustomHex}
              placeholder="#HEX"
              leftIcon={<div className="brand-swatch" style={{ background: customHex }} />}
            />
          </div>
          <div className="field-container">
            <span className="field-label">Accent</span>
            <Select width={100} items={['gray', 'brand']} value={mainAccent} onValueChange={setMainAccent} />
          </div>
          <div className="field-container">
            <span className="field-label">Theme</span>
            <Select
              width={100}
              items={['light', 'dark']}
              value={mainTheme}
              onValueChange={setMainTheme}
              renderItem={(i) => (
                <div className="select-item">
                  {i === 'light' ? <IconWeatherSunRegular16 /> : <IconWeatherMoonRegular16 />}
                  {i}
                </div>
              )}
            />
          </div>
        </Gapped>
      </div>

      <div>
        <h3 className="section-title">2. Подключение переменных</h3>
        <div className="section-desc">
          Вызовите функцию getColors для генерации стилей на клиенте или сервере. На клиенте добавьте в &lt;style&gt;.
          Желательно кешировать результат, чтобы не вызывать функцию на каждом рендере
        </div>
        <CopyBlock code={getConnectSnippet()} />
      </div>

      <div>
        <h3 className="section-title">3. Атрибуты на контейнере</h3>
        <div className="section-desc">Укажите data-атрибуты на &lt;html&gt; или &lt;body&gt;</div>
        <CopyBlock code={getAttrSnippet()} />
      </div>

      <div>
        <h3 className="section-title">4. Использование переменных</h3>
        <div className="section-desc">
          Выберите формат токенов для использования в ваших стилях (компоненты Kontur UI перекрасятся сами)
        </div>
        <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
          <Tabs.Tab id="css">CSS</Tabs.Tab>
          <Tabs.Tab id="scss">SCSS</Tabs.Tab>
          <Tabs.Tab id="less">LESS</Tabs.Tab>
          <Tabs.Tab id="ts">JS/TS</Tabs.Tab>
        </Tabs>
        <div style={{ marginTop: 16 }}>
          <CopyBlock code={getUseSnippet()} />
        </div>
      </div>
    </Gapped>
  );
};

const Widgets = () => {
  const [format, setFormat] = React.useState<'css' | 'scss' | 'less' | 'ts'>('css');

  const getRenderSnippet = () => `${kw('import')} { createRoot } ${kw('from')} ${val('react-dom/client')};
  
${kw('import')} ${val('@skbkontur/colors/tokens/brand-red_accent-gray.css')};

${kw('interface')} Props {}

${kw('export function')} render(container: HTMLElement, signal: AbortSignal, {}: Props): ${kw('void')} {
  ${kw('if')} (!container.${kw('closest')}(${val('[data-k-brand][data-k-accent]')})) {
    container.${kw('setAttribute')}(${val('data-k-brand')}, ${val('red')});
    container.${kw('setAttribute')}(${val('data-k-accent')}, ${val('gray')});
  }
  ${kw('const')} root = ${kw('createRoot')}(container);
  root.${kw('render')}(${tag('&lt;h1&gt;')}!${tag('&lt;/h1&gt;')});
  signal.${kw('addEventListener')}(${val('abort')}, () => root.${kw('unmount')}(), { once: ${kw('true')} });
}`;

  const getUseSnippet = () => {
    if (format === 'css') {
      return `${selector('.block')} {\n  ${cssProp('color')}: ${cssVal(
        'var(--k-color-text-neutral-heavy)'
      )};\n  ${cssProp('background')}: ${cssVal('var(--k-color-shape-bold-accent)')};\n}`;
    }
    if (format === 'scss') {
      return `${kw('@use')} ${val('@skbkontur/colors/colors.scss')} ${kw('as *')};\n\n${selector(
        '.block'
      )} {\n  ${cssProp('color')}: ${cssVal('$color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '$color-shape-bold-accent'
      )};\n}`;
    }
    if (format === 'less') {
      return `${kw('@import')} ${val('@skbkontur/colors/colors.less')};\n\n${selector('.block')} {\n  ${cssProp(
        'color'
      )}: ${cssVal('@color-text-neutral-heavy')};\n  ${cssProp('background')}: ${cssVal(
        '@color-shape-bold-accent'
      )};\n}`;
    }
    return `${kw('import')} * ${kw('as')} colors ${kw('from')} ${val('@skbkontur/colors')};\n\n${kw(
      'const'
    )} styles = { ${cssProp('background')}: colors.shapeBoldAccent };`;
  };

  return (
    <Gapped vertical gap={24}>
      <div>
        <h3 className="section-title">1. Настройка render.tsx</h3>
        <div className="section-desc">
          В файл{' '}
          <Link href="https://git.skbkontur.ru/platform/widget-platform/templates/kontur-react/-/blob/master/widget/render.tsx">
            render.tsx
          </Link>{' '}
          добавьте проверку цветовой схемы продукта и подключение дефолтной
        </div>
        <CopyBlock code={getRenderSnippet()} />
      </div>
      <div>
        <h3 className="section-title">2. Использование переменных</h3>
        <div className="section-desc">
          Выберите формат токенов для использования в ваших стилях (компоненты Kontur UI перекрасятся сами)
        </div>
        <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
          <Tabs.Tab id="css">CSS</Tabs.Tab>
          <Tabs.Tab id="scss">SCSS</Tabs.Tab>
          <Tabs.Tab id="less">LESS</Tabs.Tab>
          <Tabs.Tab id="ts">JS/TS</Tabs.Tab>
        </Tabs>
        <div style={{ marginTop: 16 }}>
          <CopyBlock code={getUseSnippet()} />
        </div>
      </div>
    </Gapped>
  );
};

const Libs = () => {
  const [mainTheme, setMainTheme] = React.useState('light');
  const [format, setFormat] = React.useState<'scss' | 'less' | 'ts'>('ts');

  const getUseSnippet = () => {
    if (format === 'ts') {
      const pkg = `@skbkontur/colors/default-${mainTheme}`;
      return `${kw('import')} * ${kw('as')} colors ${kw('from')} ${val(pkg)};\n\n${kw('const')} App = () => (\n  ${tag(
        '&lt;div'
      )} ${prop('style')}={{ ${cssProp('background')}: colors.shapeBoldAccent }}${tag('&gt;')}\n    Контент\n  ${tag(
        '&lt;/div&gt;'
      )}\n);`;
    }
    const syntax = { scss: { p: '$color-', s: '' }, less: { p: '@color-', s: '' } }[format as 'scss' | 'less'];
    const path = `@skbkontur/colors/tokens-default/${mainTheme}.${format}`;
    const imp = format === 'scss' ? `${kw('@use')} ${val(path)} ${kw('as *')};` : `${kw('@import')} ${val(path)};`;
    return `${imp}\n\n${selector('.block')} {\n  ${cssProp('color')}: ${cssVal(
      `${syntax.p}text-neutral-heavy${syntax.s}`
    )};\n  ${cssProp('background')}: ${cssVal(`${syntax.p}shape-bold-accent${syntax.s}`)};\n}`;
  };

  return (
    <Gapped vertical gap={24}>
      <div>
        <h3 className="section-title">1. Выбор темы</h3>
        <div className="section-desc">
          Цвета в UI-библиотеках должны зависеть от data-атрибутов интегратора. Без настроек применяется fallback на
          дефолтные цвета
        </div>
        <Gapped gap={12}>
          <div className="field-container">
            <span className="field-label">Brand</span>
            <Select disabled width={160} value="red" items={['red']} renderValue={() => renderBrandOption('red')} />
          </div>
          <div className="field-container">
            <span className="field-label">Accent</span>
            <Select disabled width={100} items={['gray']} value="gray" />
          </div>
          <div className="field-container">
            <span className="field-label">Theme</span>
            <Select
              width={100}
              items={['light', 'dark']}
              value={mainTheme}
              onValueChange={setMainTheme}
              renderItem={(i) => (
                <div className="select-item">
                  {i === 'light' ? <IconWeatherSunRegular16 /> : <IconWeatherMoonRegular16 />}
                  {i}
                </div>
              )}
            />
          </div>
        </Gapped>
      </div>
      <div>
        <h3 className="section-title">2. Использование переменных</h3>
        <div className="section-desc">
          Используйте переменные с фолбэками var(--variable, #fff). CSS не поддерживает импорт с фолбэками, доступны
          только JS/SCSS/Less:
        </div>
        <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
          <Tabs.Tab id="ts">JS/TS</Tabs.Tab>
          <Tabs.Tab id="scss">SCSS</Tabs.Tab>
          <Tabs.Tab id="less">LESS</Tabs.Tab>
        </Tabs>
        <div style={{ marginTop: 16 }}>
          <CopyBlock code={getUseSnippet()} />
        </div>
      </div>
    </Gapped>
  );
};

export const ColorsCodePlayground = (): JSX.Element => {
  const [projectType, setProjectType] = React.useState('Продукт Контура');

  return (
    <div className="constructor-container">
      <SingleToast />
      <Gapped vertical gap={24}>
        <Switcher
          size="medium"
          value={projectType}
          items={['Продукт Контура', 'Продукт OnPrem', 'Виджет', 'UI-библиотека']}
          onValueChange={setProjectType}
        />
        {projectType === 'Продукт Контура' && <ProductKontur />}
        {projectType === 'Продукт OnPrem' && <ProductOnPrem />}
        {projectType === 'Виджет' && <Widgets />}
        {projectType === 'UI-библиотека' && <Libs />}
      </Gapped>

      <style>{`
        .constructor-container { -webkit-font-smoothing: antialiased; padding: 24px; border: 1px solid #e2e7eb; border-radius: 4px; background: #ffffff; }
        .section-title { font-size: 16px; margin: 12px 0px 12px; color: rgb(46, 52, 56); font-weight: 700; }
        .section-desc { font-size: 15px; color: rgba(0, 0, 0, 0.87); margin-bottom: 12px; line-height: 1.5; }
        .field-container { display: inline-flex; flex-direction: column; gap: 4px; }
        .field-label { font-size: 14px; color: #858585; }
        .extra-row { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
        .add-btn-wrapper { margin-top: 12px; }
        .remove-btn { cursor: pointer; color: #a0a0a0; font-size: 18px; padding: 0 4px; }
        .remove-btn:hover { color: #d90912; }
        .select-item { display: flex; align-items: center; gap: 8px; }
        .brand-swatch { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0, 0, 0, 0.1); flex-shrink: 0; }
        .copy-container { position: relative; }
        .copy-pre { padding: 12px; border: 1px solid #e2e7eb; border-radius: 6px; background: #f6f8fa; font-size: 12px; line-height: 1.45; overflow: auto; margin: 0; }
        .copy-btn { position: absolute; top: 12px; right: 12px; border: 0; background: transparent; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 4px; }
        .copy-btn:hover { background: rgba(0, 0, 0, 0.05); }
        .token-kw { color: #00009f; }
        .token-val { color: #e52878; }
        .token-tag { color: #800000; }
        .token-prop { color: #00a4db; }
      `}</style>
    </div>
  );
};
