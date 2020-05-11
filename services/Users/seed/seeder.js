// create schema to mongodb using sequelize
// insert fake accounts using faker
const faker = require('faker');
const randomize = require('randomatic');
const totalFakeAccounts = process.env.TOTAL_FAKE_ACCOUNTS;

const generateUsers = () => {
  const users =  Array(parseInt(totalFakeAccounts))
    .fill()
    .map((_, i) => {
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      return generateFakeUser({firstname, lastname});
    });

  console.log('users', users);

  return users;
}

const generateSocialMediaAccounts = (name) => {
  const {firstname, lastname} = name;
  const totalAccounts = randomize('?', 1, {chars: '12'});
  const chosenProvider = randomize('?', 1, {chars: '01'});
  const providers = ['facebook', 'google'];

  const accounts = Array(parseInt(totalAccounts))
    .fill()
    .map((_, i) => {
      return {
        _id: faker.random.uuid(),
        provider: providers[chosenProvider],
        accountid: (providers[chosenProvider] === 'google') 
          ? faker.internet.email(firstname, lastname, 'gmail.com')
          : faker.internet.email(firstname, lastname)
      }
    });

  console.log('accounts', accounts);

  return accounts;
}

const generateFakeUser = (name) => {
  const {firstname, lastname} = name;
  const password = faker.internet.password();
  const social = [];
  return {
    firstname, lastname,
    email: faker.internet.email(firstname, lastname),
    phone: faker.phone.phoneNumber('09#########'),
    password: password,
    confirm: password,
    social: [...social, generateSocialMediaAccounts(name)]
  }
}

// generateUsers();
module.exports = generateUsers;