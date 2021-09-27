const User = require('../model/User');
const chalk = require('chalk');
const moment = require('moment');

const handler = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log(chalk.red.inverse('Invalid email/password'));
      process.exit(1);;
    }

    const loginTime = user.sessionTime
    const currentTime = Date().now
    var a = moment(loginTime)
    var b = moment(currentTime)
    var diffDays = b.diff(a);
    var duration = diffDays / 1000

    const responseData = await User.findByIdAndUpdate(
      user._id, { session: '', sessionTime: currentTime, sessionExpired: true }
    )

    console.log(chalk.green.inverse('User Logout Successfull!'));
    console.log('****************');
    console.log('Session Details (Logs):');
    console.log('****************');
    console.log('User total stay in the system (Duration):', duration + "s");
    console.log('User Login Time:', loginTime);
    process.exit(1);

  } catch (error) {
    console.log(chalk.red.inverse(error.message));
    process.exit(1);
  }
}

module.exports = {
  handler
}