const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    session: { type: String },
    sessionTime: { type: Date },
    sessionExpired: { type: Boolean }
  },
  { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
