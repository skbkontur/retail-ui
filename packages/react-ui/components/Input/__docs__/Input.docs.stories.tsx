import React from 'react';
import { Meta, Story } from '../../../typings/stories';

import SearchIcon from '@skbkontur/react-icons/Search';


import { Input, Button, Group, Gapped, Tooltip } from '@skbkontur/react-ui';

export default {
  title: 'Input elements/Input',
  component: Input,
} as Meta;

export const Example1: Story = () => {
  
  return (
    <Input leftIcon={<SearchIcon />} />
  );

};
Example1.storyName = 'Базовый пример';

/** 
Очистить значение в `Input`'е можно только с помощью пустой строки

*/export const Example2: Story = () => {
  
  const [value, setValue] = React.useState('Значение');
  
  return (
    <Group>
      <Input value={value} onValueChange={setValue} />
      <Button onClick={() => setValue('')}>Очистить</Button>
    </Group>
  );

};
Example2.storyName = 'Очистка значения';

export const Example3: Story = () => {
  
  return (
    <Input
      width={400}
      prefix="https://kontur.ru/search?query="
      rightIcon={<SearchIcon />}
    />
  );

};
Example3.storyName = 'Префикс';

export const Example4: Story = () => {
  
  return (
    <Gapped vertical gap={20}>
      <Gapped gap={20}>
        <Input type="password" />
        <span>type = "password"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="number" />
        <span>type = "number"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="tel" />
        <span>type = "tel"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="search" />
        <span>type = "search"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="time" />
        <span>type = "time"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="date" />
        <span>type = "date"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="url" />
        <span>type = "url"</span>
      </Gapped>
    
      <Gapped gap={20}>
        <Input type="email" />
        <span>type = "email"</span>
      </Gapped>
    </Gapped>
  );

};
Example4.storyName = 'type';

