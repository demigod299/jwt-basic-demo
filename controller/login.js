const User = require('../model/User');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log(chalk.red.inverse('Invalid email/password'));
      process.exit(1);;
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        JWT_SECRET
      )

      const currentTime = Date();

      const responseData = await User.findByIdAndUpdate(
        user._id, { session: token, sessionTime: currentTime, sessionExpired: false }
      )

      console.log(chalk.green.inverse('Login Successfull!'));
      process.exit(1);;
    } else {
      console.log(chalk.red.inverse('Invalid email/password'));
      process.exit(1);;
    }
  } catch (error) {
    console.log(chalk.red.inverse(error.message));
    process.exit(1);;
  }
}

module.exports = {
  handler
}