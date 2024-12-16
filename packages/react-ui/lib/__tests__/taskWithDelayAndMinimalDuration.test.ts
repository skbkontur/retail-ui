import { TaskWithDelayAndMinimalDuration } from '../taskWithDelayAndMinimalDuration';
import { delay } from '../utils';

describe('stop() cases', () => {
  it('after before task works', async () => {
    const taskStartCallback = jest.fn();
    const taskStopCallback = jest.fn();

    const delayBeforeTaskStart = 300;
    const durationOfTask = 1000;
    const task = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart,
      durationOfTask,
      taskStartCallback,
      taskStopCallback,
    });

    expect(task).not.toBeNull();
    expect(taskStartCallback).not.toBeCalled();
    expect(taskStopCallback).not.toBeCalled();

    task.start();
    await new Promise((r) => setTimeout(r, delayBeforeTaskStart));
    expect(taskStartCallback).toBeCalled();
    task.stop();
    expect(taskStopCallback).not.toBeCalled();
    await new Promise((r) => setTimeout(r, durationOfTask));
    expect(taskStopCallback).toBeCalled();
  });

  it('after duration task ends', async () => {
    const taskStartCallback = jest.fn();
    const taskStopCallback = jest.fn();

    const delayBeforeTaskStart = 300;
    const durationOfTask = 1000;
    const task = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart,
      durationOfTask,
      taskStartCallback,
      taskStopCallback,
    });

    expect(task).not.toBeNull();
    expect(taskStartCallback).not.toBeCalled();
    expect(taskStopCallback).not.toBeCalled();

    task.start();
    await new Promise((r) => setTimeout(r, delayBeforeTaskStart));
    expect(taskStartCallback).toBeCalled();
    await new Promise((r) => setTimeout(r, durationOfTask));
    task.stop();
    expect(taskStopCallback).toBeCalled();
  });

  it('stop when before task start', async () => {
    const taskStartCallback = jest.fn();
    const taskStopCallback = jest.fn();

    const delayBeforeTaskStart = 300;
    const durationOfTask = 1000;
    const task = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart,
      durationOfTask,
      taskStartCallback,
      taskStopCallback,
    });

    expect(task).not.toBeNull();
    expect(taskStartCallback).not.toBeCalled();
    expect(taskStopCallback).not.toBeCalled();

    task.start();
    await new Promise((r) => setTimeout(r, 100));
    task.stop();
    await new Promise((r) => setTimeout(r, delayBeforeTaskStart));
    expect(taskStartCallback).not.toBeCalled();
    expect(taskStopCallback).not.toBeCalled();
  });

  it('stop callback fired when stop in last event', async () => {
    const taskStartCallback = jest.fn();
    const taskStopCallback = jest.fn();

    const delayBeforeTaskStart = 300;
    const durationOfTask = 1000;
    const task = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart,
      durationOfTask,
      taskStartCallback,
      taskStopCallback,
    });

    task.start(); // запускаем таску "короткую"
    await delay(delayBeforeTaskStart + 900); // ждем пока закончится "короткая" таска
    task.stop(); // пытаемся остановить таски, но еще запущена "длинная" таска
    task.start(); // запускаем новую короткую таску пока запущена "длинная" таска
    await delay(200);
    task.stop(); // пытаемся остановить таски, но еще запущена "длинная" таска

    await delay(delayBeforeTaskStart + durationOfTask); // можно ждать сколько угодно, taskStopCallback не вызовется
    expect(taskStopCallback).toBeCalled();
  });
});
