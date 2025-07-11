// EventEmitter
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// LocalStorageManager
class LocalStorageManager {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to set item: ${e}`);
    }
  }

  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Failed to parse item: ${e}`);
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  has(key) {
    return localStorage.getItem(key) !== null;
  }
}

// Custom Array methods
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  if (acc === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};

// Sequential task runner
async function runSequentially(tasks) {
  const results = [];
  for (const task of tasks) {
    try {
      const result = await task();
      results.push(result);
    } catch (e) {
      console.error("Error:", e);
      results.push(null);
    }
  }
  return results;
}

// Shallow clone
function shallowClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  return Array.isArray(obj) ? obj.slice() : { ...obj };
}

// Deep clone
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);

  if (Array.isArray(value)) {
    const arr = [];
    seen.set(value, arr);
    value.forEach(item => arr.push(deepClone(item, seen)));
    return arr;
  }

  const obj = {};
  seen.set(value, obj);
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      obj[key] = deepClone(value[key], seen);
    }
  }
  return obj;
}

// Curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// Debounce
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle
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

// Deep merge
function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return target;
  if (typeof source !== 'object' || source === null) return source;

  const result = Array.isArray(target) ? [...target] : { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && typeof target[key] === 'object') {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

// Type checkers
const typeCheck = {
  isString: val => typeof val === 'string',
  isNumber: val => typeof val === 'number' && !isNaN(val),
  isArray: Array.isArray,
  isFunction: val => typeof val === 'function',
  isObject: val => val !== null && typeof val === 'object' && !Array.isArray(val),
  isBoolean: val => typeof val === 'boolean',
  isNull: val => val === null,
  isUndefined: val => val === undefined,
};

// UI Logic

// Debounce Input
const debounceInput = document.getElementById('debounce-input');
const debounceLog = document.getElementById('debounce-log');

const handleDebounce = debounce((e) => {
  debounceLog.textContent = `You typed: "${e.target.value}"`;
}, 500);

debounceInput.addEventListener('input', handleDebounce);

// Throttle Button
const throttleBtn = document.getElementById('throttle-btn');
const throttleLog = document.getElementById('throttle-log');

const throttledClick = throttle(() => {
  const now = new Date().toLocaleTimeString();
  throttleLog.textContent += `Clicked at ${now}\n`;
}, 1000);

throttleBtn.addEventListener('click', throttledClick);

// Deep Merge Button
const mergeBtn = document.getElementById('merge-btn');
const mergeOutput = document.getElementById('merge-output');

mergeBtn.addEventListener('click', () => {
  const obj1 = { name: "John", address: { city: "NY" }, hobbies: ["reading"] };
  const obj2 = { age: 30, address: { zip: "10001" }, hobbies: ["sports"] };
  const result = deepMerge(obj1, obj2);
  mergeOutput.textContent = JSON.stringify(result, null, 2);
});

// Type Checker
const typeInput = document.getElementById('type-input');
const typeBtn = document.getElementById('type-check-btn');
const typeOutput = document.getElementById('type-output');

typeBtn.addEventListener('click', () => {
  let val = typeInput.value.trim();
  try {
    val = JSON.parse(val);
  } catch (e) {}

  const result = Object.entries(typeCheck)
    .map(([key, check]) => `${key}: ${check(val)}`)
    .join('\n');

  typeOutput.textContent = result;
});

// ===== EventEmitter Demo =====
const emitter = new EventEmitter();
const emitBtn = document.getElementById('emit-btn');
const eventLog = document.getElementById('event-log');

emitter.on('greet', name => {
  eventLog.textContent += `Hello, ${name}!\n`;
});

emitBtn.addEventListener('click', () => {
  const name = prompt('Enter name:') || 'Guest';
  emitter.emit('greet', name);
});

// ===== LocalStorageManager Demo =====
const storage = new LocalStorageManager();
const lsSetBtn = document.getElementById('ls-set-btn');
const lsGetBtn = document.getElementById('ls-get-btn');
const lsRemoveBtn = document.getElementById('ls-remove-btn');
const lsOutput = document.getElementById('ls-output');

lsSetBtn.addEventListener('click', () => {
  const user = { name: "Alice", age: 25 };
  storage.set('user', user);
  lsOutput.textContent = 'User saved to localStorage.';
});

lsGetBtn.addEventListener('click', () => {
  const user = storage.get('user');
  lsOutput.textContent = user ? `Retrieved: ${JSON.stringify(user, null, 2)}` : 'No user found.';
});

lsRemoveBtn.addEventListener('click', () => {
  storage.remove('user');
  lsOutput.textContent = 'User removed from localStorage.';
});

// ===== Custom Array Methods =====
const arr = [1, 2, 3, 4, 5];
const arrayOutput = document.getElementById('array-methods-output');

document.getElementById('map-btn').addEventListener('click', () => {
  const result = arr.myMap(x => x * 2);
  arrayOutput.textContent = `myMap: ${JSON.stringify(result)}`;
});

document.getElementById('filter-btn').addEventListener('click', () => {
  const result = arr.myFilter(x => x % 2 === 0);
  arrayOutput.textContent = `myFilter: ${JSON.stringify(result)}`;
});

document.getElementById('reduce-btn').addEventListener('click', () => {
  const result = arr.myReduce((acc, x) => acc + x, 0);
  arrayOutput.textContent = `myReduce: ${result}`;
});

// ===== Cloning Demo =====
const originalObj = {
  name: "Jane",
  address: {
    city: "Paris",
    coords: { lat: 48.8566, lng: 2.3522 }
  }
};

const cloneOutput = document.getElementById('clone-output');

document.getElementById('shallow-btn').addEventListener('click', () => {
  const shallow = shallowClone(originalObj);
  shallow.address.city = "Changed in Shallow";
  cloneOutput.textContent = `Shallow Clone:\n${JSON.stringify(shallow, null, 2)}\n\nOriginal:\n${JSON.stringify(originalObj, null, 2)}`;
});

document.getElementById('deep-btn').addEventListener('click', () => {
  const deep = deepClone(originalObj);
  deep.address.city = "Changed in Deep";
  cloneOutput.textContent = `Deep Clone:\n${JSON.stringify(deep, null, 2)}\n\nOriginal:\n${JSON.stringify(originalObj, null, 2)}`;
});

// ===== Currying Demo =====
const curryBtn = document.getElementById('curry-btn');
const curryOutput = document.getElementById('curry-output');

function logMessage(a, b, c) {
  return `Logged: ${a}, ${b}, ${c}`;
}

const curriedLog = curry(logMessage);

curryBtn.addEventListener('click', () => {
  const result = curriedLog("One")("Two")("Three");
  curryOutput.textContent = result;
});

// ===== runSequentially Demo =====
const seqBtn = document.getElementById('seq-btn');
const seqOutput = document.getElementById('seq-output');

const tasks = [
  () => new Promise(res => setTimeout(() => res('Task 1 done'), 1000)),
  () => new Promise(res => setTimeout(() => res('Task 2 done'), 500)),
  () => new Promise(res => setTimeout(() => res('Task 3 done'), 1500)),
];

seqBtn.addEventListener('click', async () => {
  seqOutput.textContent = 'Running tasks...\n';
  const results = await runSequentially(tasks);
  seqOutput.textContent += results.join('\n');
});

