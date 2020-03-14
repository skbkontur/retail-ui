import React from 'react';

import { RadioGroup } from './RadioGroup';
import { Radio } from './Radio';
import { Gapped } from './Gapped';
import { Button } from './Button';

export interface Option {
  id: string;
  value: string;
}

export interface TestWithSingleAnswerProps {
  title: string;
  options: Option[];
  rightOptionId: string;
}

export const TestWithSingleAnswer = (props: TestWithSingleAnswerProps) => {
  const { title, options, rightOptionId } = props;
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <h3>{title}</h3>
      <RadioGroup onValueChange={handleAnswerSelection}>
        <Gapped vertical gap={10}>
          {options.map((x: Option, index: number) => (
            <Radio
              data-tid={`option${index}`}
              key={x.id}
              value={x.id}
              error={showResult && currentAnswer === x.id && currentAnswer !== rightOptionId}
            >
              {x.value}
            </Radio>
          ))}
          <Button data-tid="checkButton" onClick={() => setShowResult(true)}>
            Проверить!
          </Button>
        </Gapped>
      </RadioGroup>
    </div>
  );

  function handleAnswerSelection(x: any) {
    setCurrentAnswer(x);
    setShowResult(false);
  }
};
