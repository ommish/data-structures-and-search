const fs = require('fs');

const include = (word, n) => {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
    if (word.length < 3 || word.length > 7) return false;
  }
  return true;
}

const callback = (err, data) => {
  let result = "";
  data.split("\n").forEach((word, i) => {if (include(word, i)) result = result.concat(`, "${word}"`)});
  fs.writeFile('./assets/javascripts/dictionary.txt', result, 'utf8', (err) => {
    if (err) throw err;
    console.log("done");
  });
}

fs.readFile('./dictionary.txt', 'utf8', callback);
