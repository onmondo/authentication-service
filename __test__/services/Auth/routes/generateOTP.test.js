const {expect} = require('chai');
// const generateOTP = require('../../../../services/Auth/routes/generateOTP');
const dbClient = require('../../../../utils/dbConnection');
const {
  getKey, 
  setKeyAndExpire, 
  deleteKeys
} = require('../../../../services/Auth/methods');

describe('POST => /generate => generateOTP()', () => {
  context('Test Case - User sign up', () => {
    before(async () => {
      console.log('prep fakedata');
      await deleteKeys(dbClient, {keys: ['09296912977']})
    });
  
    it('should check if mobile exist and expect that it does not exist', async () => {
      const actual = await getKey(dbClient, {key: '09296912977'});
      expect(actual).to.be.null;
    });
  
    it('should save the mobile of the user upon signup', async () => {
      const fakeData = {
        key: '09296912977',
        expire: 600,
        value: '123456'
      };
  
      await setKeyAndExpire(dbClient, fakeData);
      const expected = await getKey(dbClient, {key: '09296912977'});
  
      expect(fakeData.value).to.equal(expected);
    });

    // use supertest to test the route here...
  
    after(async () => {
      console.log('db cleanup');
      await deleteKeys(dbClient, {keys: ['09296912977']})
    });
  });
});