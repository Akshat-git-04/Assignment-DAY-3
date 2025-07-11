function debounce(fn, delay) {
  let timeoutId; // Stores the current timer

  return function (...args) {
    // If the function is called again before delay ends, clear the previous timer
    clearTimeout(timeoutId);

    // Start a new timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args); 
    }, delay);
  };
}
