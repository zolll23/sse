(() => {
  // src/arr.ts
  var arr = class {
    sum(a, b) {
      return a + b;
    }
  };

  // src/index.ts
  function start() {
    const test = new arr();
    console.log(test.sum(4, 17));
  }
  start();
})();
