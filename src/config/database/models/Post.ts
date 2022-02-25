import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
  },
})

const User = mongoose.model('post', postSchema)

export default User
