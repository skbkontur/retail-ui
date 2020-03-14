export default {
  title: '😌 TestRetreat ',
};

export const MyTest = () => {
  const [currentAnswer, setCurrentAnswer] = React.useState('');

  return (
    <div style={{ padding: '4px 200px 200px 4px' }}>
      <h3>Какой сегодня день?</h3>
      <RadioGroup name="number-complex" onValueChange={x => setCurrentAnswer(x)}>
        <Gapped vertical gap={10}>
          <Radio value="friday" error={currentAnswer == 'friday'}>
            Пятница!
          </Radio>
          <Radio value="saturday">Суббота</Radio>
          <Radio value="monday" error={currentAnswer == 'monday'}>
            Пондельник :(
          </Radio>
        </Gapped>
      </RadioGroup>
    </div>
  );
};
