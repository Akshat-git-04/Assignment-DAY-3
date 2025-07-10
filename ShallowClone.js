function shallowClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.slice(); // shallow copy of array
  }

  return { ...obj }; // shallow copy of object
}

const original = {
  user: {
    name: 'Alice'
  }
};

const copy = shallowClone(original);
copy.user.name = 'Bob';

console.log(original.user.name); 
