import React from 'react';
import { WeatherMoonIcon16Regular } from '@skbkontur/icons/icons/WeatherMoonIcon/WeatherMoonIcon16Regular';
import { WeatherSunIcon16Regular } from '@skbkontur/icons/icons/WeatherSunIcon/WeatherSunIcon16Regular';
import { Link } from '@skbkontur/react-ui/components/Link';
import { Switcher } from '@skbkontur/react-ui/components/Switcher';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Toast } from '@skbkontur/react-ui/components/Toast';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Tabs } from '@skbkontur/react-ui/components/Tabs';

import { brand as brandSwatch } from '../lib/consts/default-swatch';
import { getColors } from '../lib/get-colors';

export const ColorsCodePlayground = () => {
  const [projectType, setProjectType] = React.useState('Продукт Контура');
  const [mainTheme, setMainTheme] = React.useState('light');
  const [mainBrand, setMainBrand] = React.useState('mint');
  const [customHex, setCustomHex] = React.useState('#FFDD2D');
  const [mainAccent, setMainAccent] = React.useState('brand');
  const [extraSchemes, setExtraSchemes] = React.useState<Array<{ brand: string; accent: string; theme: string }>>([]);
  const [format, setFormat] = React.useState<'ts' | 'css' | 'scss' | 'less'>('ts');

  const isWidget = projectType === 'Виджеты и библиотеки';
  const isOnPrem = projectType === 'Продукт OnPrem';
  const useItems = isWidget ? ['ts', 'scss', 'less'] : ['ts', 'css', 'scss', 'less'];

  const brandIds = Object.keys(brandSwatch);
  const restrictedBrands = ['red', 'orange'];

  const validateAccent = (brand: string, accent: string) => {
    return restrictedBrands.includes(brand) ? 'gray' : accent;
  };

  React.useEffect(() => {
    setMainAccent((prev) => validateAccent(mainBrand, prev));
  }, [mainBrand]);

  React.useEffect(() => {
    if (isWidget || isOnPrem) {
      setExtraSchemes([]);
      if (isWidget) {
        setMainBrand('red');
        setMainAccent('gray');
      } else {
        setMainBrand('mint');
      }
    }
  }, [projectType, isWidget, isOnPrem]);

  const kw = (t: string) => `<span class="token-kw">${t}</span>`;
  const val = (t: string) => `<span class="token-val">"${t}"</span>`;
  const tag = (t: string) => `<span class="token-tag">${t}</span>`;
  const prop = (t: string) => `<span class="token-prop">${t}</span>`;
  const toKebab = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const getHtmlSnippet = () => {
    const brandVal = isOnPrem ? customHex : mainBrand;
    if (isWidget) {
      return `${tag('&lt;div')} ${prop('style')}={{ background: colors.shapeBoldAccent }}${tag('&gt;')}Контент${tag(
        '&lt;/div&gt;'
      )}`;
    }
    const themeAttr = mainTheme === 'dark' ? ` ${prop('data-k-theme')}=${val('dark')}` : '';
    let siblings = `\n    ${tag('&lt;div')} ${prop('style')}={{ background: colors.shapeBoldAccent }}${tag(
      '&gt;'
    )}Контент${tag('&lt;/div&gt;')}`;

    if (projectType === 'Продукт Контура') {
      extraSchemes.forEach((s) => {
        const sTheme = s.theme === 'dark' ? ` ${prop('data-k-theme')}=${val('dark')}` : '';
        siblings += `\n\n    ${tag('&lt;div')} ${prop('data-k-brand')}=${val(s.brand)} ${prop('data-k-accent')}=${val(
          s.accent
        )}${sTheme}${tag('&gt;')}\n      Дополнительная схема\n    ${tag('&lt;/div&gt;')}`;
      });
    }
    return `${tag('&lt;div')} ${prop('data-k-brand')}=${val(brandVal)} ${prop('data-k-accent')}=${val(
      mainAccent
    )}${themeAttr}${tag('&gt;')}${siblings}\n  ${tag('&lt;/div&gt;')}`.trim();
  };

  const getUseSnippet = () => {
    if (format === 'ts') {
      const importLine = `${kw('import')} * ${kw('as')} colors ${kw('from')} ${val(
        isWidget ? `@skbkontur/colors/default-${mainTheme}` : '@skbkontur/colors'
      )};`;
      const htmlSnippet = getHtmlSnippet();
      return `${importLine}\n\n${kw('const')} App = () => (\n  ${htmlSnippet.replace(
        'Контент',
        '\n    Контент\n  '
      )}\n);`;
    }
    // eslint-disable-next-line no-nested-ternary
    const prefix = format === 'css' ? 'var(--k-color-' : format === 'scss' ? '$color-' : '@color-';
    const suffix = format === 'css' ? ')' : '';
    const code = `.block {\n  color: ${prefix}text-neutral-heavy${suffix};\n  background: ${prefix}shape-bold-accent${suffix};\n}`;
    const importPath = isWidget
      ? `@skbkontur/colors/tokens-default/${mainTheme}.${format}`
      : `@skbkontur/colors/colors.${format}`;
    const importLine =
      format === 'scss' ? `${kw('@use')} ${val(importPath)} ${kw('as *')}` : `${kw('@import')} ${val(importPath)}`;
    return `${importLine};\n\n${code}`;
  };

  const getConnectSnippet = () => {
    if (isOnPrem) {
      return `${kw('import')} { getColors } ${kw('from')} ${val('@skbkontur/colors/get-colors')};

${kw('const')} css = ${kw('getColors')}({
  brand: ${val(customHex || mainBrand)},
  accent: ${val(mainAccent)},
  theme: ${val('all')},
  output: ${val('css')}
});

${kw('const')} style = document.${kw('createElement')}(${val('style')});
style.innerHTML = css;
document.head.${kw('appendChild')}(style);`;
    }

    const all = [{ brand: mainBrand, accent: mainAccent }, ...extraSchemes];
    const unique = all.filter((v, i, a) => a.findIndex((t) => t.brand === v.brand && t.accent === v.accent) === i);
    return unique
      .map(
        (s) => `${kw('import')} ${val(`@skbkontur/colors/tokens/brand-${toKebab(s.brand)}_accent-${s.accent}.css`)};`
      )
      .join('\n');
  };

  const copyToClipboard = (snippet: string) => {
    const plainText = snippet
      .replace(/<[^>]*>?/gm, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    navigator.clipboard.writeText(plainText);
    Toast.push('Код скопирован');
  };

  const renderBrandOption = (id: string) => (
    <div className="select-item">
      <div className="brand-swatch" style={{ background: brandSwatch[id as keyof typeof brandSwatch] || id }} />
      <span>{id}</span>
    </div>
  );

  return (
    <div className="constructor-container">
      <Gapped vertical gap={32}>
        <Switcher
          size="medium"
          value={projectType}
          items={['Продукт Контура', 'Продукт OnPrem', 'Виджеты и библиотеки']}
          onValueChange={setProjectType}
        />

        <>
          <h3 className="section-title">Цветовая схема</h3>
          <div className="section-desc">
            {projectType === 'Продукт Контура' &&
              'Выберите брендовый и акцентные цвета. Для сценариев с рекламными врезками можно добавить несколько цветовых схем'}
            {projectType === 'Продукт OnPrem' && 'Укажите HEX-код, из которого сформируются светлые и темные темы'}
            {projectType === 'Виджеты и библиотеки' &&
              'Цвета виджетов и библиотек должны зависеть от контекста. Без настроенной схемы применяется fallback на дефолтные серые тона'}
          </div>
          <Gapped gap={12} verticalAlign="top" style={{ marginTop: -2 }}>
            <div className="field-container">
              <span className="field-label">Brand</span>
              {isOnPrem ? (
                <Input
                  width={160}
                  value={customHex}
                  onValueChange={setCustomHex}
                  placeholder="#HEX"
                  leftIcon={<div className="brand-swatch" style={{ background: customHex }} />}
                />
              ) : (
                <Select
                  disabled={isWidget}
                  width={160}
                  value={mainBrand}
                  onValueChange={setMainBrand}
                  items={brandIds}
                  renderItem={renderBrandOption}
                  renderValue={renderBrandOption}
                />
              )}
            </div>
            <div className="field-container">
              <span className="field-label">Accent</span>
              <Select
                disabled={isWidget}
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
                    {i === 'light' ? <WeatherSunIcon16Regular /> : <WeatherMoonIcon16Regular />}
                    {i}
                  </div>
                )}
              />
            </div>
          </Gapped>

          {projectType === 'Продукт Контура' && (
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
                  <div
                    className="remove-btn"
                    onClick={() => setExtraSchemes(extraSchemes.filter((_, idx) => idx !== i))}
                  >
                    ×
                  </div>
                </div>
              ))}
              <div className="add-btn-wrapper">
                <Link
                  onClick={() => {
                    const usedBrands = [mainBrand, ...extraSchemes.map((s) => s.brand)];
                    const nextBrand = brandIds.find((id) => !usedBrands.includes(id)) || brandIds[0];
                    setExtraSchemes([...extraSchemes, { brand: nextBrand, accent: 'gray', theme: 'light' }]);
                  }}
                >
                  + Добавить схему
                </Link>
              </div>
            </div>
          )}
        </>

        {!isWidget && (
          <>
            <h3 className="section-title">Подключение</h3>
            <div className="section-desc">
              {projectType === 'Продукт Контура' && 'Подключите CSS с цветовыми схемами в точку входа приложения'}
              {projectType === 'Продукт OnPrem' &&
                'Вызовите функцию getColors для генерации стилей на клиенте или сервере. На клиенте добавьте в <style>. Желательно кешировать результат, чтобы не вызывать функцию на каждом рендере'}
            </div>
            <div className="copy-container">
              <pre className="copy-pre" dangerouslySetInnerHTML={{ __html: getConnectSnippet() }} />
              <button className="copy-btn" onClick={() => copyToClipboard(getConnectSnippet())}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M5 2V1H11V2H5ZM4 2V3H12V2H13V15H3V2H4ZM5 4V13H11V4H5Z" fill="#AAA" />
                </svg>
              </button>
            </div>
            {projectType === 'Продукт OnPrem' && (
              <details>
                <summary>Сгенерированный код</summary>
                <pre style={{ maxHeight: 140, fontSize: 11, overflow: 'auto', border: '1px solid #E2E7EB' }}>
                  &lt;style&gt;
                  {getColors({ brand: customHex, accent: 'brand', theme: 'all', output: 'css' })}
                  &lt;/style&gt;
                </pre>
              </details>
            )}
          </>
        )}

        <>
          <div className="section-desc">
            {projectType === 'Продукт Контура' &&
              'Используйте токены через CSS-переменные (или ссылки на них в JS/SCSS/Less) и добавьте data-атрибуты на контейнер'}
            {projectType === 'Продукт OnPrem' &&
              'Используйте токены через CSS-переменные, сгенерированные функцией подключения. Либо через ссылки на них в JS/SCSS/Less'}
            {projectType === 'Виджеты и библиотеки' && (
              <>
                Используйте CSS-переменные <b>с фолбэками</b> var(--variable, #fallback) доступные в JS/SCSS/Less
              </>
            )}
          </div>
          <div className="tabs-wrapper">
            <Tabs value={format} onValueChange={(v: any) => setFormat(v)}>
              {useItems.map((id) => (
                <Tabs.Tab key={id} id={id}>
                  {id === 'ts' ? 'JS/TS' : id.toUpperCase()}
                </Tabs.Tab>
              ))}
            </Tabs>
          </div>
          <Gapped vertical gap={16}>
            <div className="copy-container">
              <pre className="copy-pre" dangerouslySetInnerHTML={{ __html: getUseSnippet() }} />
              <button className="copy-btn" onClick={() => copyToClipboard(getUseSnippet())}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M5 2V1H11V2H5ZM4 2V3H12V2H13V15H3V2H4ZM5 4V13H11V4H5Z" fill="#AAA" />
                </svg>
              </button>
            </div>
            {format !== 'ts' && (
              <div className="copy-container">
                <pre className="copy-pre" dangerouslySetInnerHTML={{ __html: getHtmlSnippet() }} />
                <button className="copy-btn" onClick={() => copyToClipboard(getHtmlSnippet())}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M5 2V1H11V2H5ZM4 2V3H12V2H13V15H3V2H4ZM5 4V13H11V4H5Z" fill="#AAA" />
                  </svg>
                </button>
              </div>
            )}
          </Gapped>
        </>
      </Gapped>

      <style>{`
.constructor-container {
  -webkit-font-smoothing: antialiased;
  padding: 24px;
  border: 1px solid #e2e7eb;
  border-radius: 4px;
  background: #ffffff;
}

.constructor-section:a {
}

.section-title {
  font-size: 16px;
  margin: 12px 0px 12px;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  cursor: text;
  position: relative;
  color: rgb(46, 52, 56);
  font-weight: 700;
}

.section-desc {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 12px;
  line-height: 1.5;
}

.field-container {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 14px;
  color: #858585;
}

.extra-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.add-btn-wrapper {
  margin-top: 12px;
}

.remove-btn {
  cursor: pointer;
  color: #a0a0a0;
  font-size: 18px;
  padding: 0 4px;
}

.remove-btn:hover {
  color: #d90912;
}

.select-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.tabs-wrapper {
  margin-bottom: 8px;
}

.copy-container {
  position: relative;
}

.copy-pre {
  padding: 12px;
  border: 1px solid #e2e7eb;
  border-radius: 6px;
  background: #f6f8fa;
  font-size: 12px;
  line-height: 1.45;
  overflow: auto;
  margin: 0;
}

.copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.copy-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.token-kw {
  color: #00009f;
}

.token-val {
  color: #e52878;
}

.token-tag {
  color: #800000;
}

.token-prop {
  color: #00a4db;
}
`}</style>
    </div>
  );
};
