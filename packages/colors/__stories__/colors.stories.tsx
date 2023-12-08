import React, { CSSProperties } from 'react';
import { KonturColors, TKonturColor } from '../src/colors';

export default {
  title: 'Colors',
  parameters: {
    creevey: {
      skip: { 'not needed': { in: ['ie11'] } },
    },
  },
};

enum stylesKeys {
  'storyWrapper' = 'storyWrapper',
  'colorBlock' = 'colorBlock',
  'colorTile' = 'colorTile',
  'wordBreak' = 'wordBreak',
  'title' = 'title',
}

const styles: { [key in stylesKeys]: Partial<CSSProperties> } = {
  [stylesKeys.storyWrapper]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  [stylesKeys.colorBlock]: {
    width: '20%',
    alignItems: 'center',
    margin: '10px',
  },
  [stylesKeys.colorTile]: {
    width: '100%',
    height: '30px',
    marginRight: '10px',
    border: '1px #000 solid',
  },
  [stylesKeys.wordBreak]: {
    wordBreak: 'break-word',
  },
  [stylesKeys.title]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export const ColorsStory = () => {
  return (
    <div style={styles.storyWrapper}>
      {Object.keys(KonturColors).map((colorName: string) => {
        const colorValue = KonturColors[colorName as TKonturColor];
        return (
          <>
            <div style={styles.colorBlock}>
              <div
                style={{
                  ...styles.colorTile,
                  backgroundColor: colorValue,
                }}
              />
              <div style={styles.title}>
                <div style={styles.wordBreak}>{colorName}</div>
                <div style={styles.wordBreak}>{colorValue}</div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
ColorsStory.storyName = 'UI Colors';
