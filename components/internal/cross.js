import ExecutionEnvironment from 'exenv';

// Windows XP fonts don't include the cross character used for the close button.
// So we use another one on XP only, because it looks ugly on modern systems.
const WIN_XP =
  ExecutionEnvironment.canUseDOM &&
  navigator.userAgent.includes('Windows NT 5.');
const CROSS = WIN_XP ? '╳' : '✕';

export default CROSS;
