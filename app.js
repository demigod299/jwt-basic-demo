const mongoose = require('mongoose');
const yargs = require('yargs');
const chalk = require('chalk');

const register = require('./controller/register');
const login = require('./controller/login');
const logout = require('./controller/logout');

require("./config/database").connect();

//customize app version using yargs
yargs.version('1.1.0')

//register command
yargs.command({
  command: 'Register',
  describe: 'Set email and password to register in the system',
  builder: {
    email: {
      describe: 'email',
      required: true,
      type: 'string'
    },
    password: {
      describe: 'Password',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    register.handler(argv.email, argv.password)
  }
});

//login command
yargs.command({
  command: 'Login',
  describe: 'Enter email and password to login in the system',
  builder: {
    email: {
      describe: 'email',
      required: true,
      type: 'string'
    },
    password: {
      describe: 'Password',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    login.handler(argv.email, argv.password)
  }
});

//logout command
yargs.command({
  command: 'Logout',
  describe: 'Enter email to logout from the system',
  builder: {
    email: {
      describe: 'Email',
      required: true,
      type: 'string'
    }
  },
  handler(argv) {
    logout.handler(argv.email)
  }
});

yargs.parse()