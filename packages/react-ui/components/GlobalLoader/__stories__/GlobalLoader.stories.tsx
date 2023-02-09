import React, { useRef, useEffect } from 'react';
import { Select, Toast, GlobalLoader, Button } from '@skbkontur/react-ui';

import { Story } from '../../../typings/stories';

function GlobalLoaderWithProps() {
  const timeOutID: any = useRef(null);
  const timeOutID2: any = useRef(null);
  const timeOutID3: any = useRef(null);
  const [error, setError] = React.useState(false);
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timeOutID.current);
      clearTimeout(timeOutID2.current);
      clearTimeout(timeOutID3.current);
    };
  }, []);

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
    timeOutID.current = setTimeout(() => {
      setActive(true);
    }, 1000);

    timeOutID2.current = setTimeout(() => {
      setError(true);
    }, 10000);

    timeOutID3.current = setTimeout(() => {
      setActive(false);
    }, 30000);
  }
}

function GlobalLoaderWithStaticMethods() {
  return (
    <div>
      <Button onClick={showGlobalLoader}>Start</Button>
      <Button onClick={sendSuccess}>Success</Button>
      <Button onClick={sendReject}>Reject</Button>
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

  function sendReject() {
    GlobalLoader.reject();
  }

  function sendAccept() {
    GlobalLoader.accept();
  }
}

function GlobalLoaderWithTimer() {
  const intervalID: any = useRef(null);
  const timeOutID: any = useRef(null);
  const [active, setActive] = React.useState(false);
  const [time, setTime] = React.useState(1);
  const [timerTime, setTimerTime] = React.useState(0);
  const [expectedResponseTime, setExpectedResponseTime] = React.useState(2);
  const [done, setDone] = React.useState(true);
  const times = [0.5, 1, 2, 4, 8, 16];
  let timer: ReturnType<typeof setInterval> | null = null;

  useEffect(() => {
    return () => {
      clearTimeout(timeOutID.current);
      clearInterval(intervalID.current);
    };
  }, []);

  return (
    <div>
      <div>
        Выберите ожидаемое время ответа от сервера (expectedResponseTime):
        <Select<number, number> items={times} value={expectedResponseTime} onValueChange={setExpectedResponseTime} />
        секунд
      </div>
      <div>
        Выберите реальное время ответа от сервера:
        <Select<number, number> items={times} value={time} onValueChange={setTime} />
        Прошло: {timerTime / 1000} секунд
      </div>
      <Button onClick={startGlobalLoader} disabled={!done}>
        Запустить Глобальный лоадер
      </Button>
      <GlobalLoader
        expectedResponseTime={expectedResponseTime * 1000}
        delayBeforeShow={0}
        active={active}
        disableAnimations={false}
        onDone={() => {
          setDone(true);
        }}
      />
      <Toast />
    </div>
  );
  function startGlobalLoader() {
    setActive(true);
    setDone(false);
    setTimerTime(0);
    startTimer();
    timeOutID.current = setTimeout(() => {
      setActive(false);
      Toast.push('Загрузка завершена');
    }, time * 1000);
  }
  function startTimer() {
    if (!timer) {
      let currentTime = 0;
      timer = intervalID.current = setInterval(() => {
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
