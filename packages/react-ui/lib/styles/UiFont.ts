import { injectGlobal } from '../theming/Emotion';

export const UI_FONT_NAME = 'ui';

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

injectGlobal`
  @font-face {
    font-family: ${UI_FONT_NAME};
    src: url(data:font/woff2;base64,${uiFontWoff2}) format('woff2');
  }
`;
