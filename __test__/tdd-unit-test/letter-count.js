// 'cat' => {c:1, a:1, t:1}
// 'better' => {b:1, e:2, t:2, r:1}
const isEmpty = require('lodash/isEmpty');

const getLetterCount = (word) => {
  return (isEmpty(word)) 
    ? {}
    : word.split('').reduce((accumulator, letter) => {
      return (!accumulator[letter])
        ? {...accumulator, [letter]: letter.length}
        : {...accumulator, [letter]: accumulator[letter]+=1};
    }, {})
};

module.exports = getLetterCount;