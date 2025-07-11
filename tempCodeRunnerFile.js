emitter.emit('welcome', 'Alice'); // → Hello, Alice

// emitter.off('welcome', greet);
// emitter.emit('welcome', 'Bob');   // → (nothing)

// emitter.once('ready', () => console.log('Ready once!'));
// emitter.emit('ready'); // → Ready once!
// emitter.emit('ready'); // → (nothing)