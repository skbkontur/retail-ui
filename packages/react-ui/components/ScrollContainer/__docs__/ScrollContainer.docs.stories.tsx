import React from 'react';
import { ScrollContainer } from '@skbkontur/react-ui';

import { Meta, Story } from '../../../typings/stories';

export default {
  title: 'Layout/ScrollContainer',
  component: ScrollContainer,
  parameters: { creevey: { skip: true } },
} as Meta;

export const Example1: Story = () => {
  function items(count) {
    const items = [];
    for (let i = 0; i < count; ++i) {
      items.push(i);
    }
    return items;
  }

  const divStyle = {
    display: 'inline-block',
    border: '1px solid #f99',
    height: 200,
    margin: 1,
    position: 'relative',
    verticalAlign: 'top',
    width: 200,
  };
  const absStyle = {
    border: '1px solid',
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
  };

  return (
    <div>
      <div style={divStyle}>
        <ScrollContainer>
          {items(20).map((i) => (
            <div key={i}>{i}</div>
          ))}
        </ScrollContainer>
      </div>
      <div style={{ ...divStyle, background: '#888' }}>
        <ScrollContainer invert>
          {items(20).map((i) => (
            <div key={i}>{i}</div>
          ))}
        </ScrollContainer>
      </div>
      <div style={divStyle}>
        <div style={absStyle}>
          <ScrollContainer>
            {items(3).map((i) => (
              <div key={i}>{i}</div>
            ))}
          </ScrollContainer>
        </div>
      </div>
      <div style={divStyle}>
        <div style={absStyle}>
          <ScrollContainer maxHeight={150}>
            {items(30).map((i) => (
              <div key={i}>{i}</div>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
};
Example1.storyName = 'Базовый пример';

export const Example2: Story = () => {
  const divStyle = {
    display: 'inline-block',
    border: '1px solid #f99',
    height: 200,
    margin: 1,
    position: 'relative',
    verticalAlign: 'top',
    width: 200,
  };
  const absStyle = {
    border: '1px solid',
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
  };

  function items(count) {
    const items = [];
    for (let i = 0; i < count; ++i) {
      items.push(i);
    }
    return items;
  }

  const innerStyle = {
    width: 400,
  };

  return (
    <div>
      <div style={divStyle}>
        <ScrollContainer>
          {items(5).map((i) => (
            <div style={innerStyle} key={i}>
              {i}
            </div>
          ))}
        </ScrollContainer>
      </div>
      <div style={{ ...divStyle, background: '#888' }}>
        <ScrollContainer invert>
          {items(20).map((i) => (
            <div style={innerStyle} key={i}>
              {i}
            </div>
          ))}
        </ScrollContainer>
      </div>
      <div style={divStyle}>
        <div style={absStyle}>
          <ScrollContainer maxHeight={150}>
            {items(3).map((i) => (
              <div style={innerStyle} key={i}>
                {i}
              </div>
            ))}
          </ScrollContainer>
        </div>
      </div>
      <div style={divStyle}>
        <div style={absStyle}>
          <ScrollContainer maxHeight={150} maxWidth={200}>
            {items(30).map((i) => (
              <div style={innerStyle} key={i}>
                {i}
              </div>
            ))}
          </ScrollContainer>
        </div>
      </div>
    </div>
  );
};
Example2.storyName = 'Горизонтальный scrollbar';

export const Example3: Story = () => {
  const containerStyle = {
    display: 'inline-block',
    border: '1px solid #f99',
    height: 200,
    margin: 1,
    width: 200,
  };

  const offsetY = {
    top: 8,
    bottom: 8,
    right: 8,
  };

  return (
    <div style={containerStyle}>
      <ScrollContainer offsetY={offsetY}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div key={i}>{i}</div>
          ))}
      </ScrollContainer>
    </div>
  );
};
Example3.storyName = 'Смещение скроллбара';

/** Проп `showScrollBar` со значением `scroll` скрывает скроллбар при отсутствии активности пользователя. Задержку на скрытие скроллбара можно регулировать пропом `hideScrollBarDelay` (по умолчанию 500ms) */
export const Example4: Story = () => {
  const divStyle = {
    display: 'inline-block',
    border: '1px solid #f99',
    height: 200,
    margin: 1,
    position: 'relative',
    verticalAlign: 'top',
    width: 200,
  };
  return (
    <div style={divStyle}>
      <ScrollContainer showScrollBar={'scroll'}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div key={i}>{i}</div>
          ))}
      </ScrollContainer>
    </div>
  );
};
Example4.storyName = 'Скрытие если нет активности пользователя';

/** Проп `showScrollBar` со значением `hover` позволяет показывать скроллбар только когда курсор находится над скролл контейнером */
export const Example5: Story = () => {
  const divStyle = {
    display: 'inline-block',
    border: '1px solid #f99',
    height: 200,
    margin: 1,
    position: 'relative',
    verticalAlign: 'top',
    width: 200,
  };

  return (
    <span>
      <div style={divStyle}>
        <ScrollContainer showScrollBar={'hover'}>
          {Array(30)
            .fill(null)
            .map((_, i) => (
              <div key={i}>{i}</div>
            ))}
        </ScrollContainer>
      </div>
    </span>
  );
};
Example5.storyName = 'Показ скролбара при наведении';
