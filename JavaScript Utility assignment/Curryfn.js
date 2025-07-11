function curry(fn) {
  return function curried(...args) {
    // If enough arguments are passed, call the original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // Otherwise return a partially applied function
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

function logger(level, message) {
  console.log(`[${level}] ${message}`);
}

const log = curry(logger);

const info = log('INFO');
const warn = log('WARN');

info('App started');    // [INFO] App started
warn('Disk almost full'); // [WARN] Disk almost full
