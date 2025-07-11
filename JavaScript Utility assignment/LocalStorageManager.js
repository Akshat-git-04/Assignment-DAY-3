class LocalStorageManager {
  // Set value safely
  set(key, value) {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (e) {
      console.error(`Failed to set item in localStorage: ${e}`);
    }
  }

  // Get value with parsing
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Failed to parse localStorage value: ${e}`);
      return null;
    }
  }

  // Remove a key
  remove(key) {
    localStorage.removeItem(key);
  }

  // Clear all
  clear() {
    localStorage.clear();
  }

  //check if key exists
  has(key) {
    return localStorage.getItem(key) !== null;
  }
}

const storage = new LocalStorageManager();

storage.set('user', { name: 'Alice', age: 30 });

const user = storage.get('user'); // { name: 'Alice', age: 30 }

storage.remove('user');

storage.clear();
