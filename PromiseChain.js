const tasks = [
  () => Promise.resolve('Task 1 done'),
  () => Promise.resolve('Task 2 done'),
  () => Promise.resolve('Task 3 done')
];

async function runSequentially(tasks) {
  const results = [];

  for (const task of tasks) {
     try {
      const result = await task();
      results.push(result);
    } catch (error) {
      console.error("Error:", error);
      results.push(null); // Or push error if you prefer
    }
  }

  return results;
}

runSequentially(tasks).then(console.log); // ["Task 1 done", "Task 2 done", "Task 3 done"]
