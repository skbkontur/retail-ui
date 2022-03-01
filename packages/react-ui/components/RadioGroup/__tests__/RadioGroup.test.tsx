import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { RadioGroup } from '../RadioGroup';
import { Radio, RadioValue } from '../../Radio';

describe('RadioGroup', () => {
  /**
   *
   * `items` prop
   *
   */

  it('should render radio buttons with correct labels', () => {
    const items = ['one', 'two', 'three'];

    render(<RadioGroup items={items} />);

    expect(screen.getByLabelText(items[0])).toBeInTheDocument();
    expect(screen.getByLabelText(items[1])).toBeInTheDocument();
    expect(screen.getByLabelText(items[2])).toBeInTheDocument();

    // We perform this kind of check only in first test as all other tests automatically pass it.
    const allRadios = screen.getAllByRole('radio');
    expect(allRadios.length).toBe(3);
  });

  it('should render radio buttons with correct values', () => {
    const items = ['one', 'two', 'three'];

    render(<RadioGroup items={items} />);

    expect(screen.getByDisplayValue(items[0])).toBeInTheDocument();
    expect(screen.getByDisplayValue(items[1])).toBeInTheDocument();
    expect(screen.getByDisplayValue(items[2])).toBeInTheDocument();
  });

  it('should render radio buttons with custom `renderItem` function', () => {
    const items = ['one', 'two', 'three'];
    const renderItem = (x: RadioValue) => {
      return x.toString().toUpperCase();
    };

    render(<RadioGroup renderItem={renderItem} items={items} />);

    expect(screen.getByLabelText(renderItem(items[0]))).toBeInTheDocument();
    expect(screen.getByLabelText(renderItem(items[1]))).toBeInTheDocument();
    expect(screen.getByLabelText(renderItem(items[2]))).toBeInTheDocument();
  });

  it('should check radio buttons on click', () => {
    const items = ['one', 'two', 'three'];

    render(<RadioGroup items={items} />);

    const firstRadio = screen.getByLabelText(items[0]);
    const secondRadio = screen.getByLabelText(items[1]);
    const thirdRadio = screen.getByLabelText(items[2]);

    // Click on the first radio button.
    userEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(firstRadio).toHaveFocus();

    // Click on the second radio button.
    userEvent.click(secondRadio);
    expect(secondRadio).toBeChecked();
    expect(secondRadio).toHaveFocus();

    // Click on the third radio button.
    userEvent.click(thirdRadio);
    expect(thirdRadio).toBeChecked();
    expect(thirdRadio).toHaveFocus();

    // Click on the first radio button again.
    userEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(firstRadio).toHaveFocus();
  });

  it('should call `onValueChange` function on radio button click', () => {
    const dictionary = ['one', 'two', 'three', 'four', 'five'];
    const items = ['one', 'two', 'three'];
    const onValueChange = () => {
      items.push(dictionary[items.length]);
    };

    render(<RadioGroup onValueChange={onValueChange} items={items} />);

    // Before we start, there shouldn't be neither 'four' or 'five' in the group.
    expect(screen.queryByLabelText('four')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('five')).not.toBeInTheDocument();

    // On the first click value 'four' should be added to the radio group.
    const firstRadio = screen.getByLabelText(items[0]);
    userEvent.click(firstRadio);
    expect(screen.getByLabelText('four')).toBeInTheDocument();

    // On the second click on the same button no new values should added to the radio group.
    userEvent.click(firstRadio);
    expect(screen.queryByLabelText('five')).not.toBeInTheDocument();

    // On the third click (this time on a different button) value 'five' should be added to the radio group.
    const secondRadio = screen.getByLabelText(items[1]);
    userEvent.click(secondRadio);
    expect(screen.getByLabelText('five')).toBeInTheDocument();
  });

  it('all radio buttons inside radio group should be disabled if `disabled` prop passed to radio group', () => {
    const items = ['one', 'two', 'three'];

    render(<RadioGroup disabled items={items} />);

    expect(screen.getByLabelText(items[0])).toBeDisabled();
    expect(screen.getByLabelText(items[1])).toBeDisabled();
    expect(screen.getByLabelText(items[2])).toBeDisabled();
  });

  it('all radio buttons inside radio group should have `name` specified by radio group', () => {
    const items = ['one', 'two', 'three'];
    const name = 'group name';

    render(<RadioGroup name={name} items={items} />);

    expect(screen.getByLabelText(items[0])).toHaveAttribute('name', name);
    expect(screen.getByLabelText(items[1])).toHaveAttribute('name', name);
    expect(screen.getByLabelText(items[2])).toHaveAttribute('name', name);
  });

  it('radio button whose value is equal to `defaultValue` prop should be intially checked', () => {
    const items = ['one', 'two', 'three'];
    const defaultValue = items[1];

    render(<RadioGroup defaultValue={defaultValue} items={items} />);

    expect(screen.getByLabelText(items[1])).toBeChecked();
  });

  it('public method `focus` should return focus to radio group', () => {
    const items = ['one', 'two', 'three'];

    const Component = () => {
      const radioGroupRef = useRef<RadioGroup>(null);

      return (
        <>
          <RadioGroup ref={radioGroupRef} items={items} />
          <button
            onClick={() => {
              if (radioGroupRef.current) {
                radioGroupRef.current.focus();
              }
            }}
          >
            call focus
          </button>
        </>
      );
    };
    render(<Component />);

    // By default radio button shouldn't have focus.
    const firstRadio = screen.getByLabelText(items[0]);
    expect(firstRadio).not.toHaveFocus();

    // But when we click button that calls public method radio button should receive focus.
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(firstRadio).toHaveFocus();
  });

  /**
   *
   * `children` prop
   *
   */

  it('should render `children`', () => {
    const items = ['one', 'two', 'three'];

    render(
      <RadioGroup>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    expect(screen.getByLabelText(items[0])).toBeInTheDocument();
    expect(screen.getByLabelText(items[1])).toBeInTheDocument();
    expect(screen.getByLabelText(items[2])).toBeInTheDocument();
  });

  it('should check radio buttons from `children` on click', () => {
    const items = ['one', 'two', 'three'];

    render(
      <RadioGroup>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    const firstRadio = screen.getByLabelText(items[0]);
    const secondRadio = screen.getByLabelText(items[1]);
    const thirdRadio = screen.getByLabelText(items[2]);

    // Click on the first radio button.
    userEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(firstRadio).toHaveFocus();

    // Click on the second radio button.
    userEvent.click(secondRadio);
    expect(secondRadio).toBeChecked();
    expect(secondRadio).toHaveFocus();

    // Click on the third radio button.
    userEvent.click(thirdRadio);
    expect(thirdRadio).toBeChecked();
    expect(thirdRadio).toHaveFocus();

    // Click on the first radio button again.
    userEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(firstRadio).toHaveFocus();
  });

  it('should call `onValueChange` on radio buttons from `children` on click', () => {
    const dictionary = ['one', 'two', 'three', 'four', 'five'];
    const items = ['one', 'two', 'three'];
    const onValueChange = () => {
      items.push(dictionary[items.length]);
    };

    render(
      <RadioGroup onValueChange={onValueChange}>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    // Before we start, the number of the items in the list must be 3.
    expect(items.length).toBe(3);

    // On the first click value 'four' should be added to the items list. Number of items in the list should increase by one.
    const firstRadio = screen.getByLabelText(items[0]);
    userEvent.click(firstRadio);
    expect(items.length).toBe(4);

    // On the second click on the same button no new values should added to the items list. Number of the items in the list should remain the same.
    userEvent.click(firstRadio);
    expect(items.length).toBe(4);

    // On the third click (this time on a different button) value 'five' should be added to the items list. Number of items in the list should increase by one.
    const secondRadio = screen.getByLabelText(items[1]);
    userEvent.click(secondRadio);
    expect(items.length).toBe(5);
  });

  it('should disable all radio buttons from `children` when disabled prop passed', () => {
    const items = ['one', 'two', 'three'];

    render(
      <RadioGroup disabled>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    expect(screen.getByLabelText(items[0])).toBeDisabled();
    expect(screen.getByLabelText(items[1])).toBeDisabled();
    expect(screen.getByLabelText(items[2])).toBeDisabled();
  });

  it('passes name from radio group to all radio buttons from `children`', () => {
    const items = ['one', 'two', 'three'];
    const name = 'group name';

    render(
      <RadioGroup name={name}>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    expect(screen.getByLabelText(items[0])).toHaveAttribute('name', name);
    expect(screen.getByLabelText(items[1])).toHaveAttribute('name', name);
    expect(screen.getByLabelText(items[2])).toHaveAttribute('name', name);
  });

  it('radio button from `children` whose value is equal to `defaultValue` prop should be intially checked', () => {
    const items = ['one', 'two', 'three'];
    const defaultValue = items[1];

    render(
      <RadioGroup defaultValue={defaultValue}>
        {items.map((item) => {
          return (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          );
        })}
      </RadioGroup>,
    );

    expect(screen.getByLabelText(items[1])).toBeChecked();
  });

  it('public method `focus` should return focus to radio group', () => {
    const items = ['one', 'two', 'three'];

    const Component = () => {
      const radioGroupRef = useRef<RadioGroup>(null);

      return (
        <>
          <RadioGroup ref={radioGroupRef}>
            {items.map((item) => {
              return (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              );
            })}
          </RadioGroup>
          <button
            onClick={() => {
              if (radioGroupRef.current) {
                radioGroupRef.current.focus();
              }
            }}
          >
            call focus
          </button>
        </>
      );
    };
    render(<Component />);

    // By default radio button shouldn't have focus.
    const firstRadio = screen.getByLabelText(items[0]);
    expect(firstRadio).not.toHaveFocus();

    // But when we click button that calls public method radio button should receive focus.
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(firstRadio).toHaveFocus();
  });
});
