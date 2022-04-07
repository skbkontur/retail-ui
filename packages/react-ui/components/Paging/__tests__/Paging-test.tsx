import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';

import { emptyHandler } from '../../../lib/utils';
import { defaultLangCode } from '../../../lib/locale/constants';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { PagingLocaleHelper } from '../locale';
import { Paging } from '../Paging';

describe('Paging', () => {
  it('should render correct number of links', () => {
    render(<Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />);

    expect(screen.getAllByTestId('Paging__pageLink')).toHaveLength(5);
  });

  it('should render right dots', () => {
    render(<Paging pagesCount={10} activePage={1} onPageChange={emptyHandler} />);

    expect(screen.getByTestId('Paging__dots')).toBeInTheDocument();
  });

  it('should render left dots', () => {
    render(<Paging pagesCount={10} activePage={9} onPageChange={emptyHandler} />);

    expect(screen.getByTestId('Paging__dots')).toBeInTheDocument();
  });

  it('should render left and right dots', () => {
    render(<Paging pagesCount={12} activePage={6} onPageChange={emptyHandler} />);

    expect(screen.getAllByTestId('Paging__dots')).toHaveLength(2);
  });

  it('should call `onPageChange` on not chosen link', async () => {
    const onPageChange = jest.fn();
    const activePage = 2;
    const activePageIndex = activePage - 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const links = screen.getAllByTestId('Paging__pageLink');
    await userEvent.click(links[activePageIndex - 1]);

    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  it('should not call `onPageChange` on chosen link', async () => {
    const onPageChange = jest.fn();
    const activePage = 1;
    const activePageIndex = activePage - 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const links = screen.getAllByTestId('Paging__pageLink');
    await userEvent.click(links[activePageIndex]);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should call `onPageChange` with right page number', async () => {
    const onPageChange = jest.fn();
    const activePage = 1;
    const activePageIndex = activePage - 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const links = screen.getAllByTestId('Paging__pageLink');
    await userEvent.click(links[activePageIndex + 1]);

    expect(onPageChange).toHaveBeenCalledWith(activePage + 1);
  });

  it('should have forward button', () => {
    render(<Paging pagesCount={2} activePage={1} onPageChange={emptyHandler} />);

    expect(screen.getByTestId('Paging__forwardLink')).toBeInTheDocument();
  });

  it('should call `onPageChange` on forward button click', async () => {
    const onPageChange = jest.fn();
    render(<Paging pagesCount={2} activePage={1} onPageChange={onPageChange} />);

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    await userEvent.click(forwardButton);

    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  it('should not call `onPageChange` on forward button click if active page is last', async () => {
    const onPageChange = jest.fn();
    const lastPage = 2;
    render(<Paging pagesCount={lastPage} activePage={lastPage} onPageChange={onPageChange} />);

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    await userEvent.click(forwardButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should call `onPageChange` on forward button click with right page number', async () => {
    const onPageChange = jest.fn();
    const activePage = 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    await userEvent.click(forwardButton);

    expect(onPageChange).toHaveBeenCalledWith(activePage + 1);
  });

  it('should handle choosing page from keyboard (right arrow key)', async () => {
    const onPageChange = jest.fn();
    const activePage = 1;
    const activePageIndex = activePage - 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const activeLink = screen.getAllByTestId('Paging__pageLink')[activePageIndex];

    await userEvent.click(activeLink);
    await userEvent.keyboard('[ArrowRight][Enter]');

    expect(onPageChange).toHaveBeenCalledWith(activePage + 1);
  });

  it('should handle choosing page from keyboard (left arrow key)', async () => {
    const onPageChange = jest.fn();
    const activePage = 2;
    const activePageIndex = activePage - 1;
    render(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    const activeLink = screen.getAllByTestId('Paging__pageLink')[activePageIndex];

    await userEvent.click(activeLink);
    await userEvent.keyboard('[ArrowLeft][Enter]');

    expect(onPageChange).toHaveBeenCalledWith(activePage - 1);
  });

  it('should handle ctrl + right keys', async () => {
    const onPageChange = jest.fn();
    const activePage = 1;
    const wrapper = mount(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    wrapper.simulate('keydown', { key: 'ArrowRight', ctrlKey: true });

    expect(onPageChange).toHaveBeenCalledWith(activePage + 1);
  });

  it('should handle ctrl + left keys', () => {
    const onPageChange = jest.fn();
    const activePage = 2;
    const wrapper = mount(<Paging pagesCount={2} activePage={activePage} onPageChange={onPageChange} />);

    wrapper.simulate('keydown', { key: 'ArrowLeft', ctrlKey: true });

    expect(onPageChange).toHaveBeenCalledWith(activePage - 1);
  });

  it('keyboard control available with global listener', () => {
    const onPageChange = jest.fn();
    const wrapper = mount<Paging>(
      <Paging useGlobalListener pagesCount={2} activePage={2} onPageChange={onPageChange} />,
    );

    expect(wrapper.state('keyboardControl')).toBe(true);
  });

  it('keyboard control available with focus', () => {
    const onPageChange = jest.fn();
    const wrapper = mount<Paging>(<Paging pagesCount={2} activePage={2} onPageChange={onPageChange} />);

    expect(wrapper.state('keyboardControl')).toBe(false);

    wrapper.simulate('focus');

    expect(wrapper.state('keyboardControl')).toBe(true);
  });
});

describe('Paging Locale', () => {
  it('should not chash without LocaleProvider', () => {
    render(<Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />);

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    const expectedText = PagingLocaleHelper.get(defaultLangCode).forward;

    expect(forwardButton).toContainHTML(expectedText);
  });

  it('should render default locale', () => {
    render(
      <LocaleContext.Provider value={{}}>
        <Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />
      </LocaleContext.Provider>,
    );

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    const expectedText = PagingLocaleHelper.get(defaultLangCode).forward;

    expect(forwardButton).toContainHTML(expectedText);
  });

  it('should render `en_GB` locale', () => {
    render(
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />
      </LocaleContext.Provider>,
    );

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    const expectedText = PagingLocaleHelper.get(LangCodes.en_GB).forward;

    expect(forwardButton).toContainHTML(expectedText);
  });

  it('should render custom locale', () => {
    const customPlaceholder = 'custom forward';
    render(
      <LocaleContext.Provider
        value={{
          locale: { Paging: { forward: customPlaceholder } },
        }}
      >
        <Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />
      </LocaleContext.Provider>,
    );

    const forwardButton = screen.getByTestId('Paging__forwardLink');

    expect(forwardButton).toContainHTML(customPlaceholder);
  });

  it('should update locale', async () => {
    const buttonText = 'update langCode';
    const Component = () => {
      const [langCode, setLangCode] = useState(LangCodes.en_GB);

      return (
        <>
          <button onClick={() => setLangCode(LangCodes.ru_RU)}>{buttonText}</button>

          <LocaleContext.Provider value={{ langCode: langCode }}>
            <Paging pagesCount={5} activePage={1} onPageChange={emptyHandler} />
          </LocaleContext.Provider>
        </>
      );
    };
    render(<Component />);

    const forwardButton = screen.getByTestId('Paging__forwardLink');
    const expectedEnglishText = PagingLocaleHelper.get(LangCodes.en_GB).forward;

    // Should render `en_GB` locale by default.
    expect(forwardButton).toContainHTML(expectedEnglishText);

    const updateButton = screen.getByRole('button', { name: buttonText });
    const expectedRussianText = PagingLocaleHelper.get(LangCodes.ru_RU).forward;

    // Updating locale.
    await userEvent.click(updateButton);

    // Should render `ru_RU` locale.
    expect(forwardButton).toContainHTML(expectedRussianText);
  });
});
