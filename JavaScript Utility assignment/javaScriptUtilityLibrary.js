// Debounce: delays execution until a pause in calls
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle: ensures func is only called at most once per delay period
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Deep Merge: recursively merges two objects
function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return target;
  if (typeof source !== 'object' || source === null) return source;

  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if ( typeof source[key] === 'object' && source[key] !== null && typeof target[key] === 'object') {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

// Type Checkers: common runtime type utilities
const typeCheck = {
  isString: (val) => typeof val === 'string',
  isNumber: (val) => typeof val === 'number' && !isNaN(val),
  isArray: Array.isArray,
  isFunction: (val) => typeof val === 'function',
  isObject: (val) => val !== null && typeof val === 'object' && !Array.isArray(val),
  isBoolean: (val) => typeof val === 'boolean',
  isNull: (val) => val === null,
  isUndefined: (val) => val === undefined,
};

// Export everything (for module-based usage)
export {
  debounce,
  throttle,
  deepMerge,
  typeCheck
};
