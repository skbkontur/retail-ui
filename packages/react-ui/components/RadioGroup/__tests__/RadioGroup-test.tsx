import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup, RadioGroupDataTids, RadioGroupProps } from '../RadioGroup';
import { Radio, RadioDataTids } from '../../Radio';
import { clickOutside } from '../../../lib/utils';

const renderRadioGroup = (
  props: Partial<RadioGroupProps<any>> & {
    children?: React.ReactElement<any>;
  },
) => render(<RadioGroup {...props} />);

describe('<RadioGroup />', () => {
  const items = ['one', 'two', 'three'];
  const clickedIndex = 1;
  const defaultValueIndex = 2;
  const rgRef = React.createRef<RadioGroup<string>>();

  it('renders radios inside for items prop', () => {
    renderRadioGroup({ items });

    expect(screen.getAllByTestId(RadioDataTids.root)).toHaveLength(3);
  });

  it('renders radios with correct labels', () => {
    renderRadioGroup({ items });
    const radios = screen.getAllByTestId(RadioDataTids.root);
    items.forEach((item, index) => {
      expect(radios[index]).toHaveTextContent(item);
    });
  });

  it('renders radios with correct values', () => {
    renderRadioGroup({ items });
    const radios = screen.getAllByRole('radio');

    items.forEach((item, index) => {
      expect(radios[index]).toHaveAttribute('value', item);
    });
  });

  it('renders radios with renderItem prop', () => {
    const renderItem = (x: string) => x.toUpperCase();
    renderRadioGroup({ items, renderItem });
    const radios = screen.getAllByTestId(RadioDataTids.root);

    items.forEach((item, index) => {
      expect(radios[index]).toHaveTextContent(renderItem(item));
    });
  });

  it('checks radio on click', async () => {
    renderRadioGroup({ items });
    const radios = screen.getAllByTestId(RadioDataTids.root);
    await userEvent.click(radios[clickedIndex]);

    expect(screen.getAllByRole('radio')[clickedIndex]).toBeChecked();
  });

  it('calls onValueChange on radio click', async () => {
    const onValueChange = jest.fn();

    renderRadioGroup({ items, onValueChange });
    const radios = screen.getAllByTestId(RadioDataTids.root);
    await userEvent.click(radios[clickedIndex]);

    expect(onValueChange).toHaveBeenCalled();
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe(items[clickedIndex]);
  });

  it('disables all radios on disabled prop', () => {
    renderRadioGroup({ items, disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((x) => {
      expect(x).toBeDisabled();
    });
  });

  it('passes given name to all radios on name prop', () => {
    renderRadioGroup({ items, name: 'SupaGroup' });
    const radios = screen.getAllByRole('radio');
    radios.forEach((x) => {
      expect(x).toHaveProperty('name', 'SupaGroup');
    });
  });

  it('activates radio with defaultValue', () => {
    renderRadioGroup({ items, defaultValue: items[defaultValueIndex] });
    expect(screen.getAllByRole('radio')[defaultValueIndex]).toBeChecked();
  });

  it('handle onMouseOver event', () => {
    const onMouseOver = jest.fn();

    render(<RadioGroup items={items} onMouseOver={onMouseOver} />);
    fireEvent.mouseOver(screen.getByTestId(RadioGroupDataTids.root));
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('handle onMouseEnter event', () => {
    const onMouseEnter = jest.fn();

    render(<RadioGroup items={items} onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(screen.getByTestId(RadioGroupDataTids.root));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handle onMouseLeave event', () => {
    const onMouseLeave = jest.fn();

    render(<RadioGroup items={items} onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByTestId(RadioGroupDataTids.root));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('renders children', () => {
    renderRadioGroup({ children: <span data-tid="myDupaComponent" /> });
    expect(screen.getByTestId('myDupaComponent')).toBeInTheDocument();
  });

  it('checks children radio on click', async () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    renderRadioGroup({ children });

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[clickedIndex]);
    expect(screen.getAllByRole('radio')[clickedIndex]).toBeChecked();
  });

  it('calls onValueChange on children radio click', async () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    const onValueChange = jest.fn();
    renderRadioGroup({ children, onValueChange });

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[clickedIndex]);

    expect(onValueChange).toHaveBeenCalled();
    const [value] = onValueChange.mock.calls[0];
    expect(value).toBe(items[clickedIndex]);
  });

  it('disables all children radios on disabled prop', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    renderRadioGroup({ children, disabled: true });
    const radios = screen.getAllByRole('radio');
    radios.forEach((x) => {
      expect(x).toBeDisabled();
    });
  });

  it('passes given name to all children radios on name prop', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    renderRadioGroup({ children, name: 'SupaGroup' });
    const radios = screen.getAllByRole('radio');
    radios.forEach((x) => {
      expect(x).toHaveProperty('name', 'SupaGroup');
    });
  });

  it('activates children radio with defaultValue', () => {
    const children = (
      <div>
        <Radio value="one">Hello</Radio>
        <Radio value="two">Hello</Radio>
        <Radio value="three">Hello</Radio>
      </div>
    );
    renderRadioGroup({ children, defaultValue: items[defaultValueIndex] });
    expect(screen.getAllByRole('radio')[defaultValueIndex]).toBeChecked();
  });

  it('should focus on first button in not checked radiogroup', () => {
    render(<RadioGroup items={items} ref={rgRef} />);
    rgRef.current?.focus();
    expect(screen.getAllByRole('radio')[0]).toHaveFocus();
  });

  it('should focus on defaultValue button', () => {
    render(<RadioGroup items={items} ref={rgRef} defaultValue={items[defaultValueIndex]} />);
    rgRef.current?.focus();
    expect(screen.getAllByRole('radio')[defaultValueIndex]).toHaveFocus();
  });

  it('has Prevent static prop', () => {
    expect(RadioGroup.Prevent).toBeDefined();
  });

  it('works with number values', async () => {
    const items = [1, 2, 3, 4];
    renderRadioGroup({ items });

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[clickedIndex]);
    expect(screen.getAllByRole('radio')[clickedIndex]).toBeChecked();
  });

  it('should call `onBlur` after click outside of radio button', () => {
    const onBlur = jest.fn();
    render(<RadioGroup items={items} onBlur={onBlur} />);

    const radio = screen.getAllByRole('radio')[0];

    fireEvent.focus(radio);
    fireEvent.blur(radio);
    fireEvent.blur(radio);
    clickOutside();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should call `onBlur` after click outside of radio group', async () => {
    const onBlur = jest.fn();
    const onRadioBlur = jest.fn();

    render(
      <RadioGroup onBlur={onBlur} ref={rgRef}>
        <Radio value="one" onBlur={onRadioBlur} />
        <Radio value="two" onBlur={onRadioBlur} />
      </RadioGroup>,
    );
    const radioOne = screen.getAllByRole('radio')[0];
    const radioTwo = screen.getAllByRole('radio')[1];
    await userEvent.click(radioOne);
    fireEvent.blur(radioOne);
    fireEvent.blur(radioTwo);

    clickOutside();

    expect(onRadioBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should pass generic type without type errors', () => {
    function RadioGroupGeneric<T>() {
      return (
        <RadioGroup<T>>
          <Radio value={'str'} />
        </RadioGroup>
      );
    }

    expect(() => render(<RadioGroupGeneric />)).not.toThrow();
  });

  it('should have correctly role', () => {
    render(
      <RadioGroup>
        <Radio value={'str'} />
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('children has prevent table role', () => {
    render(<RadioGroup items={['One', 'Two']} />);
    expect(screen.getAllByRole('presentation')).toHaveLength(2);
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <RadioGroup aria-describedby={'elementRadioGroupId'}>
          <Radio value="one" aria-describedby={'elementRadioId'} />
        </RadioGroup>
        <p id="elementRadioId">Description Radio item</p>
        <p id="elementRadioGroupId">Description Radio group</p>
      </div>,
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-describedby', 'elementRadioId');
    expect(radio).toHaveAccessibleDescription('Description Radio item');

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-describedby', 'elementRadioGroupId');
    expect(radioGroup).toHaveAccessibleDescription('Description Radio group');
  });

  it('should have visual state disabled attribute', () => {
    render(<RadioGroup items={['one', 'two']} disabled />);

    expect(screen.getByRole('radiogroup')).toHaveAttribute('data-visual-state-disabled');
  });
});
