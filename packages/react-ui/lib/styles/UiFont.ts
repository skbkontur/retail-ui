import { globalObject, isBrowser } from '@skbkontur/global-object';

import { injectGlobal, prefix } from '../theming/Emotion';

export const uiFontGlobalClasses = prefix('ui-font')({
  root: 'root',
  element: 'element',
});

const uiFontName = 'ui';

const uiFontWoff2 =
  'd09GMk9UVE8AAAM0AAkAAAAABOwAAALtAAEZmQAAAAAAAAAAAAAAAAAAAAAAAAAADYNHBmAATAE2AiQDEAQGBYJHByAbSQTIHodxLLFkxvCafPI36w' +
  'UCtbTOiShd0zOVLzXnVD3Mprf8381PJXqgZb2jFq3JN9rLLMKAEi2lMG8HzqkL4rRGmlAlSFHfIhL0YtdjFEbbAPDD2JUXUURAJRBjl6txH54vKxuX' +
  'HP/FwmZOmLmImVsys1HRh8nnGD0jMldklFN+ebnk32ymBCATYs9eUNfDZcK63rHvdC91WW2od/d1rYdytB4ACDwoN9HVhJLspIz5RfRs95ndG4zTxu' +
  '3dG6+tN0Ly/p5bjC179u3ZfKvxOMDp6+i3YZ4iUvhUwYyOfKYo5+ZXruz7oHVcM0dmlNMivlyinulTxYFn2m7b8zNK/G7eqhMX4hso3Eu3ilY8XuO5' +
  'eCuRyxYDne7OaZTk7IwtqKJCx5F9atBVXuFM5GzWGqcZPOaxIRi9+roWJEcV4/H+ZIO36ojjbYJxXeN+4MY/7jDOb7pm2ILwjHq8P9XgLTrito87qk' +
  'Ef7CLmfwstiPJxdjqjM48An8/cQb1yxj7tl46qhw/xmMX4tAfkDF/mP/g07YE4zeY5k9ycI+PNf7K5QjTQzkXUEz2Dl5pzl/LqS9U8KxsELOaYwly3' +
  'nS/t5+cy9nI2c4OSS2QmFNilyVIzAGr660kbyLBgcFdC+l4OaAguNq6ZufAiH9rKWzMjgPsMoflAVgCABOkcgHxIlAIygBC0iN9OkQDACXsjQagsjb' +
  'Z4LKu1EndYL6271lqrPVQNEX1Ksi/K1yM4o6035S9k+QMAvEqtx/19iZkRySVvBWCbVeohr26j1AwKEiTXeAUAoKWtE36AzEVifNwB1ANQAG6sbhkQ' +
  'OGevBSTY4ETLtAxRkA1+WD0mg1AHCEIoDhEJHqQiMkqg5jKtRxTo6LesomUfNP1jDP2SljAv944saTKsxwF9qtLkKpVVq96UW3Q0xgCOHAtWMIxYiB' +
  'HqxBI7OpBSCWUQhm52JqMxLGRwwwl9nBSD9eoApB6rAhMqLNTYSkMdMgw+qyIwAAAAAA==';

const uiFontWoff =
  'd09GRk9UVE8AAARUAAkAAAAABOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAACpAAAAa4AAAHHJkH54k9TLzIAAAFMAAAAUgAAAGCNA2InY2' +
  '1hcAAAAlQAAAA5AAAATAE1AKRoZWFkAAAA6AAAADIAAAA2JdX/E2hoZWEAAAEsAAAAHwAAACQF8gGRaG10eAAAARwAAAAQAAAAEAcrAPZtYXhwAAAA' +
  '4AAAAAYAAAAGAARQAG5hbWUAAAGgAAAAtAAAAUd8gS+xcG9zdAAAApAAAAATAAAAIP9GADsAAFAAAAQAAHgBY2BkYGBglJypkKVQHc9v85WBmfkFAx' +
  'A8sg34Dqct//1h4mZeA+SyMzCBRAFVTwwrAAACWABwAOcAAAGUADkCWABNeAFjYGRgYF7z7w8DA1MEgyWDBRM3UAQVsAAAY1wDiAB4AWNgYTzFOIGB' +
  'lYGDqYspgoGBwRtCM8YxGDH8Z0ACCxiY3jswKFTD+KHe4X4MBxgUGOKZ1/z7w8DAvIaRRYGBcT5IjomB6RiQUmBgAADLYg8MAAB4AW2MNWKEUAAFJ+' +
  '6uJWU8/7dxd9c2Buwii18oF43i0D0dYIhP2gBoox9i3U4P/bHuzOVdzDIW6+6/vIO2zj7amGQ+1u0MsxnrDhY4j3VnbtOFIIp1dy4fzemxX85j60P1' +
  'g3fHV+9UPbJe/acf23RailyRQqwfHe6eN8MfI3ikxQcqPgHvOPio3KGiE2Hxio9kBYlAsM4j5zxzxXrt7yn2TRxaKOSfRxyyyzlNwrgR31v9JsZ4AW' +
  'NgYGACYmYgFgGSjGCahcECSHMxcDAwAaECgy5DPMOC//+BYnD2/4f/r/5f8j8RqAMOAEsaDdAAAAB4AWNgZgCD/84M1gxYAAAjQQGBAHgBTRADkBxB' +
  'cGYx+8nN7u3dVWzbNoopxXZmP7Zt21Yh9s7Xx0Yx/Ni21VPfH7z/etruocTQCKU00HawFzt8hBgyPDbFLKHyEZWfqgKaym3gYK5f4sYFXKu2JDY2vw' +
  'dBC+1W9cNEpzQmT7HKlatUrFK5shgydNzwfn36jiw8qN+IEf0G94nqmAyUOKRx+jBq0Dy0ovqIax/7F/wd8rxM8Hde2S53yMMD9sg9cfFxu+Vh+SAM' +
  'xotqr6pAfawPC5FLAUuxcTJvXOlN5N/pHGpqYuMcSW5+bKFchkce5/CtJxfMWj508TxWq5UJQY9hF6iVA/JDF8xvJeteDsgnywG/YEUYaSqGiCssEm' +
  'hiAsd8Kak1c0io/kAiT869miNCT5ryweF6ErqIerUs5FA5B4SA13rQKzmebEgrQpxpDw43kNBJ1Ov+QLCIS2Kw+p9OOZKVwsDPpzk4ixDXVQeMZNFY' +
  'xqdagjkwwVGlYdFdegEO6/AVFuW4i4cbWk7yv7S6RGer37ragq1yXEpq1cJyxm9UKzdCs42s4NZW4X882wIeSMj+LJCwkvNny7n9H30nvLcAAA==';

injectGlobal`
  @font-face {
    font-family: ${uiFontName};
    src: url(data:font/woff2;base64,${uiFontWoff2}) format('woff2'),
    url(data:font/woff;base64,${uiFontWoff}) format('woff');
  }
`;

const $this = globalObject;

if (isBrowser($this)) {
  const baseFont = () => $this.getComputedStyle($this.document.body).fontFamily;

  const injectFont = () => injectGlobal`
    .${uiFontGlobalClasses.root},
    .${uiFontGlobalClasses.root} > *,
    .${uiFontGlobalClasses.element} {
      font-family: ${uiFontName}, ${baseFont()};
      font-variant-numeric: tabular-nums;
    }
  `;

  setTimeout(injectFont);
}
