class EventEmitter {
  constructor() {
    this.events = {}; // Store event listeners
  }

  // Register a listener
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Emit an event
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  // Remove a listener
  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  // Register a one-time listener
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // Remove after first call
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();

function greet(name) {
  console.log(`Hello, ${name}`);
}

emitter.on('welcome', greet);
emitter.emit('welcome', 'Alice'); // → Hello, Alice

emitter.off('welcome', greet);
emitter.emit('welcome', 'Bob');   // → (nothing)

emitter.once('ready', () => console.log('Ready once!'));
emitter.emit('ready'); // → Ready once!
emitter.emit('ready'); // → (nothing)
