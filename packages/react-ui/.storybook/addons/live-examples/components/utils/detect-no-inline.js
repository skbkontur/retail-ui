export function detectNoInline(code) {
  var clearedCode = code.split('\n').filter(function (line) {
    return line.startsWith('//') === false;
  }).join('\n').trim();
  return clearedCode.startsWith('<') === false && clearedCode.startsWith('//') === false;
}