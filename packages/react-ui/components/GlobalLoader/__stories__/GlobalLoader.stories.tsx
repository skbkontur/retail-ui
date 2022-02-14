import React from 'react';
import { Select, Toast, GlobalLoader, Button } from '@skbkontur/react-ui';

import { Story } from '../../../typings/stories';

function GlobalLoaderWithProps() {
  const [error, setError] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <div>
      <Button onClick={showGlobalLoaderWithProps}>Show Global Loader</Button>
      <GlobalLoader
        expectedResponseTime={2000}
        delayBeforeShow={0}
        active={active}
        rejected={error}
        disableAnimations={false}
      />
    </div>
  );

  function showGlobalLoaderWithProps() {
    setTimeout(() => {
      setActive(true);
    }, 1000);

    setTimeout(() => {
      setError(true);
    }, 10000);

    setTimeout(() => {
      setActive(false);
    }, 30000);
  }
}

function GlobalLoaderWithStaticMethods() {
  return (
    <div>
      <Button onClick={showGlobalLoader}>Start</Button>
      <Button onClick={sendSuccess}>Success</Button>
      <Button onClick={sendError}>Error</Button>
      <Button onClick={sendAccept}>Accept</Button>
      <GlobalLoader expectedResponseTime={2000} disableAnimations={false} />
    </div>
  );

  function showGlobalLoader() {
    GlobalLoader.start();
  }

  function sendSuccess() {
    GlobalLoader.done();
  }

  function sendError() {
    GlobalLoader.reject();
  }

  function sendAccept() {
    GlobalLoader.accept();
  }
}

function GlobalLoaderWithTimer() {
  const [active, setActive] = React.useState(false);
  const [time, setTime] = React.useState(1);
  const [timerTime, setTimerTime] = React.useState(0);
  const [expectedResponseTime, setExpectedResponseTime] = React.useState(2);
  const times = [0.5, 1, 2, 4, 8, 16];
  let timer: ReturnType<typeof setInterval> | null = null;
  return (
    <div>
      <div>
        Выбирите время, через которое предполагается что придет ответ от сервера:
        <Select<number, number> items={times} value={expectedResponseTime} onValueChange={setExpectedResponseTime} />
        секунд
      </div>
      <div>
        Выбирите время, через которое придет ответ от сервера:
        <Select<number, number> items={times} value={time} onValueChange={setTime} />
        Прошло: {timerTime / 1000} секунд
      </div>
      <Button onClick={startGlobalLoader} disabled={active}>
        {' '}
        Запустить Глобальный лоадер{' '}
      </Button>
      <GlobalLoader
        expectedResponseTime={expectedResponseTime * 1000}
        delayBeforeShow={0}
        active={active}
        disableAnimations={false}
      />
      <Toast />
    </div>
  );
  function startGlobalLoader() {
    setActive(true);
    setTimerTime(0);
    startTimer();
    setTimeout(() => {
      setActive(false);
      Toast.push('Загрузка завершена');
    }, time * 1000);
  }
  function startTimer() {
    if (!timer) {
      let currentTime = 0;
      timer = setInterval(() => {
        setTimerTime(currentTime);
        currentTime += 100;
        if (currentTime > time * 1000) {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }
      }, 100);
    }
  }
}

export default { title: 'GlobalLoader' };

export const GlobalLoaderWithPropsContent: Story = () => <GlobalLoaderWithProps />;
GlobalLoaderWithPropsContent.storyName = 'with props';
GlobalLoaderWithPropsContent.parameters = { creevey: { skip: true } };

export const GlobalLoaderWithStaticMethodsContent: Story = () => <GlobalLoaderWithStaticMethods />;
GlobalLoaderWithStaticMethodsContent.storyName = 'with static methods';
GlobalLoaderWithStaticMethodsContent.parameters = { creevey: { skip: true } };

export const GlobalLoaderWithTimerContent: Story = () => <GlobalLoaderWithTimer />;
GlobalLoaderWithTimerContent.storyName = 'with timer';
GlobalLoaderWithTimerContent.parameters = { creevey: { skip: true } };
