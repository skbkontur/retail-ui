import * as React from 'react';
import { Effect, DELAY_BEFORE_SHOW_LOADER, LOADER_SHOW_TIME } from '../default';
import { delay } from 'retail-ui/lib/utils';

interface ItemType {
  value: number;
  label: string;
}

type RenderItem = (item: ItemType) => React.ReactNode;

const createGetPropsMock = (renderItem: RenderItem) =>
  jest.fn(() => ({
    onUnexpectedInput: null,
    renderItem
  }));

const testCase = [
  {
    inputValue: 'One',
    items: [
      {
        value: 1,
        label: 'One'
      }
    ],
    renderItem: (item: ItemType) => item.label,
    expectedDispatch: true
  },
  {
    inputValue: 'One',
    items: [
      {
        value: 1,
        label: 'One'
      },
      {
        value: 2,
        label: 'Two'
      }
    ],
    renderItem: (item: ItemType) => item.label,
    expectedDispatch: false
  },
  {
    inputValue: 'One Plus',
    items: [
      {
        value: 1,
        label: 'One'
      }
    ],
    renderItem: (item: ItemType) => `${item.label} Plus`,
    expectedDispatch: true
  },
  {
    inputValue: 'Two',
    items: [
      {
        value: 2,
        label: 'Two'
      }
    ],
    renderItem: (item: ItemType) => <span>{item.label}</span>,
    expectedDispatch: true
  }
];

describe('Default combobox reducer', () => {
  testCase.forEach(
    ({ inputValue, items, renderItem, expectedDispatch }, index) => {
      it(`ValueChange after UnexpectedInput (test ${index + 1})`, () => {
        const mockedGetProps = createGetPropsMock(renderItem);
        const mockedDispatch = jest.fn();
        const mockedGetState = jest.fn();
        const mockedGetInstance = jest.fn();

        Effect.UnexpectedInput(inputValue, items)(
          mockedDispatch,
          mockedGetState,
          mockedGetProps,
          mockedGetInstance
        );

        if (expectedDispatch) {
          expect(mockedDispatch).toBeCalledWith({
            type: 'ValueChange',
            value: items[0]
          });
        } else {
          expect(mockedDispatch).not.toBeCalled();
        }
      });
    }
  );
});

describe('Search', () => {
  const query = 'one';
  const items = ['one', 'two'];
  let state = { loading: false };
  let instance = { requestId: 0 };
  let getState = jest.fn();
  let getInstance = jest.fn();
  let dispatch = jest.fn();

  beforeEach(() => {
    state = { loading: false };
    instance = { requestId: 0 };
    getState = jest.fn(() => state);
    getInstance = jest.fn(() => instance);
    dispatch = jest.fn(
      ({ type }) =>
        type === 'RequestItems'
          ? (state.loading = true)
          : (state.loading = false)
    );
  });

  it('without delay', async () => {
    const getItems = jest.fn(() => Promise.resolve(items));
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it(`with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER - 200), Promise.resolve(items)
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);

    await delay(DELAY_BEFORE_SHOW_LOADER);

    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it(`with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER + 200), Promise.resolve(items)
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);

    await delay(DELAY_BEFORE_SHOW_LOADER);

    expect(dispatch).toBeCalledWith({ type: 'RequestItems' });
    dispatch.mockClear();

    await delay(LOADER_SHOW_TIME);
    await delay(0);

    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it('rejected without delay', async () => {
    const getItems = jest.fn(() => Promise.reject());
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toBeCalledWith({
      type: 'RequestFailure',
      repeatRequest: expect.any(Function)
    });
  });

  it(`rejected with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER - 200), Promise.reject()
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);

    await delay(DELAY_BEFORE_SHOW_LOADER);

    expect(dispatch).toBeCalledWith({
      type: 'RequestFailure',
      repeatRequest: expect.any(Function)
    });
  });

  it(`rejected with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER + 200), Promise.reject()
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toBeCalledWith(query);

    await delay(DELAY_BEFORE_SHOW_LOADER);

    expect(dispatch).toBeCalledWith({ type: 'RequestItems' });
    dispatch.mockClear();

    await delay(LOADER_SHOW_TIME);

    expect(dispatch).toBeCalledWith({
      type: 'RequestFailure',
      repeatRequest: expect.any(Function)
    });
  });

  it('twice without delay', async () => {
    const getItems = jest.fn(() => Promise.resolve(items));
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(0);

    expect(getItems).toHaveBeenCalledTimes(2);
    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER - 250), Promise.resolve(items)
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER - 300);

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER);

    expect(getItems).toHaveBeenCalledTimes(2);
    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it(`twice with delay < ${DELAY_BEFORE_SHOW_LOADER} loader`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER - 100), Promise.resolve(items)
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER - 200);

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER - 100);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'RequestItems' });
    dispatch.mockClear();

    await delay(LOADER_SHOW_TIME + 100);

    expect(getItems).toHaveBeenCalledTimes(2);
    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it(`twice with delay > ${DELAY_BEFORE_SHOW_LOADER}`, async () => {
    const getItems = jest.fn(
      async () => (
        await delay(DELAY_BEFORE_SHOW_LOADER + 200), Promise.resolve(items)
      )
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER - 300);

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(300);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'RequestItems' });
    dispatch.mockClear();

    await delay(LOADER_SHOW_TIME + 100);

    expect(getItems).toHaveBeenCalledTimes(2);
    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });

  it('twice with slow then fast requests', async () => {
    const delays = [
      DELAY_BEFORE_SHOW_LOADER + 200,
      DELAY_BEFORE_SHOW_LOADER - 200
    ];
    const getItems = jest.fn(
      async () => (await delay(delays.shift() || 0), Promise.resolve(items))
    );
    const getProps = jest.fn(() => ({ getItems }));

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(300);

    Effect.Search(query)(dispatch, getState, getProps, getInstance);

    await delay(DELAY_BEFORE_SHOW_LOADER - 300);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'RequestItems' });
    dispatch.mockClear();

    await delay(200);

    expect(dispatch).not.toBeCalled();

    await delay(LOADER_SHOW_TIME - 200);

    expect(getItems).toHaveBeenCalledTimes(2);
    expect(getItems).toBeCalledWith(query);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith({ type: 'ReceiveItems', items });
  });
});
