// MAP
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Only map if key exists (skip empty slots)
    if (this.hasOwnProperty(i)) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

const nums1 = [1, 2, 3];
const squared = nums1.myMap(x => x * x); // [1, 4, 9]

// FILTER
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
const nums2 = [1, 2, 3, 4];
const evens = nums2.myFilter(n => n % 2 === 0); // [2, 4]


// REDUCE
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  let startIndex = 0;

  if (acc === undefined) {
    // No initialValue given, use first element
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
const nums3 = [1, 2, 3, 4];
const sum = nums3.myReduce((acc, val) => acc + val, 0); // 10
console.log(sum);