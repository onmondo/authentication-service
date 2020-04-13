const {expect} = require('chai');
const getLetterCount = require('./letter-count');

describe('getLetterCount - basic functionality', () => {
  it('should return an empty object', () => {
    const expected = {};
    const actual = getLetterCount('');
    expect(actual).to.deep.equal(expected);
  });

  // it('should return letters as an array of letters', () => {
  //   const expected = ['c', 'a', 't'];
  //   const actual = getLetterCount('cat');
  //   expect(actual).to.deep.equal(expected);
  // });

  it('should count each letter as one', () => {
    const expected = {'c':1, 'a':1, 't':1};
    const actual = getLetterCount('cat');
    expect(actual).to.deep.equal(expected);
  });

  it('should return the correct letter count with more than one occurence', () => {
    const expected = {'m':1, i:4, s:4, p:2};
    const actual = getLetterCount('mississippi');
    expect(actual).to.deep.equal(expected);
  });

});