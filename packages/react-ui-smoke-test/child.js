console.log('child process, should not exit');

process.stdin.on('end', function() {
  process.exit();
});

process.stdin.resume();
