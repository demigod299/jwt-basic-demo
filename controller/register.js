const User = require('../model/User');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');

const handler = async (email, password) => {
  if (!email || typeof email !== 'string') {
    console.log(chalk.red.inverse('Invalid email!'));
    process.exit(1);
  }
  if (!password || typeof password !== 'string') {
    console.log(chalk.red.inverse('Invalid Password!'));
    process.exit(1);
  }
  if (password.length < 5) {
    console.log(chalk.red.inverse('Password too small. Should be atleast 6 characters'));
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      email,
      password: hashedPassword
    })
    console.log(chalk.green.inverse('User Successfully Created!'));
    process.exit(1);
  } catch (error) {
    if (error.code === 11000) {
      console.log(chalk.red.inverse('email already in use'));
      process.exit(1);
    } else {
      console.log(chalk.red.inverse(error.message));
      process.exit(1);
    }
  }

}

module.exports = {
  handler
}