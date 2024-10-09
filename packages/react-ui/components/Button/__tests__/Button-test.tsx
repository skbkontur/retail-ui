import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';
import { Button, ButtonDataTids, ButtonType } from '../Button';

describe('Button', () => {
  it('has id attribute', () => {
    const buttonId = 'buttonId';
    const result = render(<Button id={buttonId}>Foo</Button>);
    expect(result.container.querySelector(`button#${buttonId}`)).toHaveTextContent('Foo');
  });

  it('has correct label', () => {
    render(<Button>Foo</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Foo');
  });

  (['submit', 'button', 'reset'] as ButtonType[]).forEach((type) => {
    it(`sets type ${type} when type=${type} specified`, () => {
      render(<Button type={type} />);
      expect(screen.getByRole('button')).toHaveProperty('type', type);
    });
  });

  it('handles click event', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));

    expect(onClick.mock.calls).toHaveLength(1);
  });

  it('handels onBlur event', async () => {
    const onBlur = jest.fn();
    render(<Button onBlur={onBlur} />);

    await userEvent.click(screen.getByRole('button'));
    screen.getByRole('button').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handels onFocus event', async () => {
    const onFocus = jest.fn();
    render(<Button onFocus={onFocus} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', async () => {
    const onKeyDown = jest.fn();
    render(<Button onKeyDown={onKeyDown} />);

    await userEvent.type(screen.getByRole('button'), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseEnter event', async () => {
    const onMouseEnter = jest.fn();
    render(<Button onMouseEnter={onMouseEnter} />);

    await userEvent.type(screen.getByRole('button'), '{mouseenter}');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseOver event', async () => {
    const onMouseOver = jest.fn();
    render(<Button onMouseOver={onMouseOver} />);

    await userEvent.type(screen.getByRole('button'), '{mouseover}');
    expect(onMouseOver).toHaveBeenCalledTimes(1);
  });

  it('handles onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    render(<Button onMouseLeave={onMouseLeave} />);

    fireEvent.mouseLeave(screen.getByRole('button'));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('autofocus', () => {
    render(<Button autoFocus />);
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('unable to focus disabled element', async () => {
    render(<Button disabled />);
    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('unable to focus loading element', async () => {
    render(<Button loading />);
    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('has focus() method', () => {
    const btnRef = React.createRef<Button>();
    render(<Button ref={btnRef} />);
    screen.getByRole('button').focus();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('has blur() method', () => {
    const btnRef = React.createRef<Button>();
    render(<Button ref={btnRef} />);
    screen.getByRole('button').focus();
    expect(screen.getByRole('button')).toHaveFocus();
    btnRef.current?.blur();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <Button aria-describedby="elementId" />
        <p id="elementId">Description</p>
      </div>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'elementId');
    expect(button).toHaveAccessibleDescription('Description');
  });

  it('passes `aria-haspopup` attribute', () => {
    render(<Button aria-haspopup />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'true');
  });

  it('passes `aria-expanded` attribute', () => {
    render(<Button aria-expanded />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('passes correct value into `aria-controls` attribute', () => {
    const controlsId = 'controls';
    render(<Button aria-controls={controlsId} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', controlsId);
  });

  it('passes correct value to `aria-label` attribute', () => {
    const label = 'label';
    render(<Button aria-label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('passes correct value to `role` attribute', () => {
    const role = 'link';
    render(<Button role={role} />);

    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  it('switches `aria-checked` from `false` to `true`', async () => {
    const Component = () => {
      const [isChecked, setIsChecked] = useState(false);
      return <Button role="switch" onClick={() => setIsChecked(true)} aria-checked={isChecked} />;
    };

    render(<Component />);

    const button = screen.getByRole('switch');
    expect(button).not.toBeChecked();
    await userEvent.click(button);
    expect(button).toBeChecked();
  });

  it('event `onClickCapture` works correctly', async () => {
    const onClickCapture = jest.fn();
    render(<Button onClickCapture={onClickCapture} />);

    expect(onClickCapture).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button'));

    expect(onClickCapture).toHaveBeenCalledTimes(1);
  });

  it('events `onMouseDown` and `onMouseUp` work correctly', async () => {
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    render(<Button onMouseDown={onMouseDown} onMouseUp={onMouseUp} />);

    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onMouseUp).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });

  it('has data-tid `Button__spinner` when component in loading state (THEME_2022)', () => {
    render(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <Button loading />
      </ThemeContext.Provider>,
    );

    expect(screen.getByTestId(ButtonDataTids.spinner)).toBeInTheDocument();
  });

  it(`className prop shouldn't override value on root`, () => {
    const props = { className: '' };
    render(<Button {...props}>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('', { exact: true });
  });

  it(`data-tid prop shouldn't override value on root`, () => {
    const props = { 'data-tid': 'foo' };

    render(<Button {...props}>Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('data-tid', ButtonDataTids.rootElement);
  });

  describe('with use=link prop', () => {
    const handleSubmit = jest.fn();
    const handleReset = jest.fn();
    const TestForm = ({ submit }: { submit?: boolean }) => {
      return (
        <ThemeContext.Provider value={LIGHT_THEME}>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Button type={submit ? 'submit' : 'reset'} use={'link'} size={'medium'}>
              {submit ? 'Submit' : 'Reset'}
            </Button>
          </form>
        </ThemeContext.Provider>
      );
    };
    it('type=submit submits form on click (THEME_2022)', async () => {
      render(<TestForm submit />);
      await userEvent.click(screen.getByText('Submit'));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('type=reset resets form on click (THEME_2022)', async () => {
      render(<TestForm />);
      await userEvent.click(screen.getByText('Reset'));
      expect(handleReset).toHaveBeenCalled();
    });
  });

  describe('with component=a prop', () => {
    it('should render <a> tag', () => {
      render(
        <Button component="a" href="/">
          Button as Link
        </Button>,
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should render <button> tag when omitted', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it.each([{ disabled: true }, { loading: true }])(`shouldn't be focusable when %p`, (prop) => {
      render(
        <Button href="/" component="a" {...prop}>
          Button Link
        </Button>,
      );

      userEvent.tab();
      expect(screen.getByRole('link')).not.toHaveFocus();
    });

    it(`should have correct tabIndex`, () => {
      render(
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        <Button component="a" href="/" tabIndex={1}>
          Button Link
        </Button>,
      );

      expect(screen.getByRole('link')).toHaveAttribute('tabindex', '1');
    });
  });
});
