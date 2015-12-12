process.on('SIGTERM', () => {console.log('SIGTERM!'); process.exit(1)});

console.log('hi');
setInterval(() => process.kill(process.pid, 'SIGTERM'), 2000);
setInterval(() => console.log('alive'), 1000);
