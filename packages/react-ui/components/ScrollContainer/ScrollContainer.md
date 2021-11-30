Базовый пример контейнера с прокруткой.
```jsx harmony
import { Button } from '@skbkontur/react-ui';

const [items, setItems] = React.useState([1,2,3]);

<div style={{ display: 'flex', justifyContent: "space-between", width: '550px' }}>
  <div style={{
    display: 'inline-block',
    border: '1px solid #f99',
    width: 200,
    height: 200,
    paddingLeft: '5px',
  }}
  >
    <ScrollContainer>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </ScrollContainer>
  </div>

  <div>
    <p>
      <span style={{ color: 'red' }}>Красным&nbsp;</span>
      цветом выделена высота контейнера.
    </p>
    <Button onClick={() => setItems([...items, items.length + 1])}>
      Добавить элемент
    </Button>
  </div>
</div>
```

Пример контейнера, отслеживающего текущее положение прокрутки.
```jsx harmony
const [horizontal, setHorizontal] = React.useState('left');
const [vertical, setVertical] = React.useState('top');

const items = (count) => {
  const items = [];
  for (let i = 0; i < count; ++i) {
    items.push(Math.PI * Math.random());
  }
  return items;
}

<div style={{ display: 'flex', justifyContent: "space-between", width: '450px' }}>
  <div style={{
    display: 'inline-block',
    border: '1px solid #000',
    width: 200,
    height: 200,
    paddingLeft: '5px',
  }}
  >
    <ScrollContainer
      onScrollStateChangeX={(scrollState) => setHorizontal(scrollState)}
      onScrollStateChangeY={(scrollState) => setVertical(scrollState)}
    >
      {items(30).map((item) => (
        <div style={{ width: 300 }} key={item}>{item}</div>
      ))}
    </ScrollContainer>
  </div>

  <div>
    <p>
      Вертикальное положение:
      <span style={{fontWeight: 'bold'}}>{vertical}</span>
    </p>
    <p>
      Горизонтальное положение:
      <span style={{fontWeight: 'bold'}}>{horizontal}</span>
    </p>
  </div>
</div>
```

Пример контейнера, отключающего скролл окна.
```jsx harmony
import { Button } from '@skbkontur/react-ui';

const [isScrollPrevented, setIsScrollPrevented] = React.useState(true);

const items = (count) => {
  const items = [];
  for (let i = 0; i < count; ++i) {
    items.push(i + 1);
  }
  return items;
}

<div style={{ display: 'flex' }}>
  <div style={{
    display: 'inline-block',
    border: '1px solid #000',
    width: 200,
    height: 200,
    paddingLeft: '5px',
  }}
  >
    <ScrollContainer preventWindowScroll={isScrollPrevented}>
      {items(20).map((item) => (
        <div key={item}>{item}</div>
      ))}
    </ScrollContainer>
  </div>

  <div style={{marginLeft: '30px'}}>
    <Button
      use={isScrollPrevented ? 'primary' : 'default'}
      onClick={() => setIsScrollPrevented(!isScrollPrevented)}
      >
        {isScrollPrevented ? 'Включить скролл окна' : 'Отключить скролл окна'}
    </Button>
    <p style={{ width: '150px' }}>
      {isScrollPrevented ?
        "При достижении низа контейнера страница не будет скроллиться." :
        "При достижении низа контейнера страница будет скроллиться."}
    </p>
  </div>
</div>
```

Пример контейнера, с публичными методами.
```jsx harmony
import {
  ArrowBoldDown,
  ArrowBoldLeft,
  ArrowBoldRight,
  ArrowBoldUp
  } from '@skbkontur/react-icons'
import { Button, Gapped } from '@skbkontur/react-ui';

const containerRef = React.useRef(null);

const items = (count) => {
  const items = [];
  for (let i = 0; i < count; ++i) {
    items.push(Math.PI * Math.random());
  }
  return items;
}

<div style={{ display: 'flex', justifyContent: "space-between", width: '450px' }}>
  <div style={{
    display: 'inline-block',
    border: '1px solid #000',
    width: 200,
    height: 200,
    paddingLeft: '5px',
  }}
  >
    <ScrollContainer ref={containerRef}>
      {items(30).map((item) => (
        <div style={{ width: 300 }} key={item}>{item}</div>
      ))}
    </ScrollContainer>
  </div>

  <Gapped vertical style={{marginLeft: '20px'}}>
    <Button
      style={{width: 220}}
      onClick={() => containerRef.current.scrollToBottom()}
      align="left"
      icon={<ArrowBoldDown />}
      >
      Проскроллить до низу
    </Button>
    <Button
      style={{width: 220}}
      onClick={() => containerRef.current.scrollToTop()}
      align="left"
      icon={<ArrowBoldUp />}
      >
      Проскроллить до верху
    </Button>
    <Button
      style={{width: 220}}
      onClick={() => containerRef.current.scrollToRight()}
      align="left"
      icon={<ArrowBoldRight />}
      >
      Проскроллить вправо
    </Button>
    <Button
      style={{width: 220}}
      onClick={() => containerRef.current.scrollToLeft()}
      align="left"
      icon={<ArrowBoldLeft />}
      >
      Проскроллить влево
    </Button>
  </Gapped>
</div>
```
