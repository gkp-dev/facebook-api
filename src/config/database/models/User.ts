import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  profile: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  posts: [mongoose.Types.ObjectId],
  createdAt: {
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
  },
})

const User = mongoose.model('user', userSchema)

export default User
