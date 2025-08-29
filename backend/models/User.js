const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
  }, 
  password: {
    type: String,
    required: true,
    trim: true,
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  try {
    this.password = await bcrypt.hash(this.password, 10)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = new mongoose.model("User", userSchema)