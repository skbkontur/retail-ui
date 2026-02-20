import React from 'react';
import { Hint } from '@skbkontur/react-ui';

type ColorValue = string;
type ThemeValues = { light: ColorValue; dark: ColorValue };

interface TokenPair {
  key: string;
  value: ThemeValues;
}

interface ColorSection {
  [key: string]: ColorValue | ColorSection;
}

interface BaseTokenSection {
  [key: string]: ColorValue | BaseTokenSection;
}

interface BaseTokensObject {
  [key: string]: BaseTokenSection | { [key: string]: BaseTokenSection };
}

export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: true,
    },
  },
};

export const SemanticTokensStory = () => {
  const CustomFunctionComponent = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref}>children text</div>);
  return (
    <div>
      <Hint pos="top" text="Something will never be changed">
        <CustomFunctionComponent />
      </Hint>
    </div>
  );
};

SemanticTokensStory.storyName = 'Semantic tokens';
