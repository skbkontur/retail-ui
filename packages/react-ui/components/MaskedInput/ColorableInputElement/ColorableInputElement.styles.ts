import { injectGlobal, prefix } from '../../../lib/theming/Emotion';

export const globalClasses = prefix('colorable')({
  input: 'input',
});

injectGlobal`
  input.${globalClasses.input} {
    display: inline-block;
    background-color: transparent;
    background-size: 100%;
    background-repeat: repeat;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
