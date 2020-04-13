const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual')
const getLetterCount = require('./letter-count');

const isAnagram = (payload) => {
  if (isEmpty(payload)) {
    return {};
  }

  const wordCount = payload.length;
  if (wordCount === 2) {
    const words = payload.map(word => word.replace(/\s/g, '').trim().toLowerCase());

    const isSameInLength = (words[0].length === words[1].length);
    if(!isSameInLength) {
      return {isAnagram: false, words: payload};  
    }

    const letterCounts = words.map(word => getLetterCount(word));
    return {isAnagram: isEqual(letterCounts[0], letterCounts[1]), words: payload};
  } else {
    return {isAnagram: false, words: payload};
  }
};

module.exports = {isAnagram};