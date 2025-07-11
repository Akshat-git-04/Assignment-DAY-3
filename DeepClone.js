function deepClone(value, seen = new WeakMap()) {
  // Handle primitives and functions (leave functions as-is)
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // handle circular refs
  if (seen.has(value)) {
    return seen.get(value);
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    const cloneArr = [];
    seen.set(value, cloneArr); // Mark before recursion
    for (let item of value) {
      cloneArr.push(deepClone(item, seen));
    }
    return cloneArr;
  }

  // Handle plain Objects
  const cloneObj = {};
  seen.set(value, cloneObj); // Mark before recursion
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(value[key], seen);
    }
  }
  return cloneObj;
}

const original = {
  name: 'Alice',
  address: {
    city: 'Wonderland',
    zip: 12345
  },
  tags: ['magic', 'rabbit']
};

const copy = deepClone(original);
copy.address.city = 'Nowhere';
copy.tags.push('dream');

console.log(original.address.city); // "Wonderland"
console.log(original.tags);         // ['magic', 'rabbit']
