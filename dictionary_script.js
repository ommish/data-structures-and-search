const fs = require('fs');

const isPrime = (n) => {
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

const callback = (err, data) => {
  let result = "";
  data.split("\n").forEach((word, i) => {if (isPrime(i)) result = result.concat(`, "${word}"`)});
  fs.writeFile('./assets/javascripts/dictionary.txt', result, 'utf8', (err) => {
    if (err) throw err;
    console.log("done");
  });
}

fs.readFile('./dictionary.txt', 'utf8', callback);
