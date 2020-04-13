// anagrams
// accepts payload
// accepts empty payload (2 strings)
// accepts only 2 payload (2 strings)
// both strings must be equall in length
// if one of the string has whitespaces, it should be ignored
// if one of the string is in uppercase or lowercase, it should be ignored
// both strings must contain same letters
// both strings must contain same amount of letters

const {expect} = require('chai');
const {isAnagram} = require('./anagrams');

describe('isAnagram - check both strings', () => {
  it('should accept an empty payload object', () => {
    const expected = {};
    const actual = isAnagram();
    expect(actual).to.deep.equal(expected);
  });

  it('should accept a payload that contains array of strings', () => {
    const expected = {isAnagram: false, words: ['listen']};
    const actual = isAnagram(['listen']);
    expect(actual).to.deep.equal(expected);
  });

  it('should return error if words indicated are not exactly 2 in length', () => {
    const expected = {isAnagram: false, words: ['listen', 'silent', 'ooops']};
    const actual = isAnagram(['listen', 'silent', 'ooops']);
    expect(actual).to.deep.equal(expected);
  });

  it('should accept a payload that contains only 2 array of strings', () => {
    const expected = {isAnagram: true, words: ['listen', 'silent']};
    const actual = isAnagram(['listen', 'silent']);
    expect(actual).to.deep.equal(expected);
  });

  it('should return false if words are not same in length', () => {
    const expected = {isAnagram: false, words: ['listen', 'sislent']};
    const actual = isAnagram(['listen', 'sislent']);
    expect(actual).to.deep.equal(expected);
  });

  it('should return true if words are same in length', () => {
    const expected = {isAnagram: true, words: ['listen', 'silent']};
    const actual = isAnagram(['listen', 'silent']);
    expect(actual).to.deep.equal(expected);
  });

  it('should both have contain same letters', () => {
    const expected = {isAnagram: true, words: ['listen', 'silent']};
    const actual = isAnagram(['listen', 'silent']);
    expect(actual).to.deep.equal(expected);
  }); 

  it('should ignore whitespaces', () => {
    const payload = ['conversation', 'voices rant on'];
    const expected = {isAnagram: true, words: payload};
    const actual = isAnagram(payload);
    expect(actual).to.deep.equal(expected);
  });  

  it('should ignore UPPER and lower cases', () => {
    const payload = ['STATE', 'taste'];
    const expected = {isAnagram: true, words: payload};
    const actual = isAnagram(payload);
    expect(actual).to.deep.equal(expected);
  }); 

});

