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
    await delay(delayBeforeTaskStart);
    expect(taskStartCallback).toBeCalled();
    task.stop();
    expect(taskStopCallback).not.toBeCalled();
    await delay(durationOfTask);
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
    await delay(delayBeforeTaskStart);
    expect(taskStartCallback).toBeCalled();
    await delay(durationOfTask);
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
    await delay(100);
    task.stop();
    await dekay(delayBeforeTaskStart);
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
    task.start(); // пытаемся запустить новую короткую таску пока запущена "длинная" таска (она не должна запуститься)
    await delay(200);
    task.stop(); // пытаемся остановить таски, "длинная" уже закончилась, короткая еще бы не успела запуститься

    await delay(delayBeforeTaskStart + durationOfTask); // можно ждать сколько угодно, taskStopCallback должен быть вызван, если короткая в итоге не запустилась
    expect(taskStopCallback).toBeCalled();
  });
});
