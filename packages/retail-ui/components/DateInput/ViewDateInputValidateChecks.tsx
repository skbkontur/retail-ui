import React from 'react';

import { MAX_DATE, MAX_MONTH, MAX_YEAR, MIN_DATE, MIN_MONTH, MIN_YEAR } from '../../lib/date/constants';
import { InternalDate } from '../../lib/date/InternalDate';
import { InternalDateValidateCheck } from '../../lib/date/types';
import { Checkbox } from '../Checkbox';
import { Gapped } from '../Gapped';

interface DateInputValidateChecksProps {
  value: string;
  minDate: string;
  maxDate: string;
}

export class ViewDateInputValidateChecks extends React.Component<DateInputValidateChecksProps> {
  public render() {
    const internalDate = new InternalDate();
    internalDate.parseInternalValue(this.props.value);
    internalDate.setRangeStart(this.props.minDate ? new InternalDate().parseInternalValue(this.props.minDate) : null);
    internalDate.setRangeEnd(this.props.maxDate ? new InternalDate().parseInternalValue(this.props.maxDate) : null);

    return (
      <Gapped gap={10} vertical>
        <h3>Внутренние проверки</h3>
        <Checkbox disabled checked={internalDate.validate({ checks: [InternalDateValidateCheck.NotNull] })}>
          ⭣ <code style={{ color: 'black' }}>NotNull</code>
          <div>
            Все компоненты даты заполнены (не равны{' '}
            <b>
              <code>null</code>
            </b>
            )
          </div>
        </Checkbox>
        <Checkbox disabled checked={internalDate.validate({ checks: [InternalDateValidateCheck.Limits] })}>
          ⭣ <code style={{ color: 'black' }}>Limits</code>
          <div>
            Компоненты даты не выходят за рамки предустановленных лимитов
            <br />
            Год: {MIN_YEAR} - {MAX_YEAR}
            <br />
            Месяц: {MIN_MONTH} - {MAX_MONTH}
            <br />
            Число: {MIN_DATE} - {MAX_DATE}
          </div>
        </Checkbox>
        <Checkbox disabled checked={internalDate.validate({ checks: [InternalDateValidateCheck.Native] })}>
          ⭣ <code style={{ color: 'black' }}>Native</code>
          <div>
            Из компонентов даты можно создать валидный экземпляр нативного объекта <code>Date()</code>
          </div>
        </Checkbox>
        <Checkbox disabled checked={internalDate.validate({ checks: [InternalDateValidateCheck.Range] })}>
          ⭳ <code style={{ color: 'black' }}>Range</code>
          <div>
            Дата не выходит за пределы диапазонов <code>minDate/maxDate</code>
          </div>
        </Checkbox>
      </Gapped>
    );
  }
}
