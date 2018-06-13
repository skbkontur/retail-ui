// @flow

import type { ITheme } from '../theme/index';

export default function MonthView(theme: ITheme) {
  return {
    headerMonth: {
      display: 'inline-block'
    },
    headerYear: {
      display: 'inline-block',
      position: 'absolute',
      right: '0px'
    },

    month: {
      position: 'absolute',
      width: '210px'
    },

    headerSticked: {
      backgroundColor: 'white',
      zIndex: 1
    },

    monthTitle: {
      fontWeight: 'bold',
      borderBottom: '1px solid #dfdede',
      marginBottom: '10px',
      position: 'relative'
    },

    placeholder: {
      display: 'inline-block'
    }
  };
}
