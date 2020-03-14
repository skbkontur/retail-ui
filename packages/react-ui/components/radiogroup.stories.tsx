export default {
  title: '😌 TestRetreat ',
};

interface Option {
  id: string;
  value: string;
}

export const MyTest = () => {
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);

  const rightAnswer = 'saturday';
  const options: Option[] = [
    { id: 'friday', value: 'Пятница' },
    { id: 'saturday', value: 'Суббота' },
    { id: 'monday', value: 'Пондельник :(' },
  ];

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <h3>Какой сегодня день?</h3>
      <RadioGroup name="number-complex" onValueChange={handleAnswerSelection}>
        <Gapped vertical gap={10}>
          {options.map((x: Option) => (
            <Radio
              key={x.id}
              value={x.id}
              z
              error={showResult && currentAnswer === x.id && currentAnswer !== rightAnswer}
            >
              {x.value}
            </Radio>
          ))}
          <Button onClick={() => setShowResult(true)}>Проверить!</Button>
        </Gapped>
      </RadioGroup>
    </div>
  );

  function handleAnswerSelection(x: any) {
    setCurrentAnswer(x);
    setShowResult(false);
  }
};
