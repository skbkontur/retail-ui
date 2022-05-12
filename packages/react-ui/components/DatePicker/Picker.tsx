import React from 'react';

import { Calendar } from '../Calendar';
import { CalendarDateShape } from '../../internal/Calendar';
import { Nullable } from '../../typings/utility-types';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { styles } from './Picker.styles';

interface Props {
  maxDate?: CalendarDateShape;
  minDate?: CalendarDateShape;
  value: Nullable<CalendarDateShape>;
  onPick: (date: CalendarDateShape) => void;
  onSelect?: (date: CalendarDateShape) => void;
  enableTodayLink?: boolean;
  isHoliday?: (day: CalendarDateShape & { isWeekend: boolean }) => boolean;
}

export class Picker extends React.Component<Props> {
  public static __KONTUR_REACT_UI__ = 'Picker';

  private theme!: Theme;
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    return (
      <div className={styles.root(this.theme)} onMouseDown={(e) => e.preventDefault()}>
        <Calendar {...this.props} />
      </div>
    );
  }
}
