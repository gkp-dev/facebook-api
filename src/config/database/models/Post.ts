import mongoose from 'mongoose'

type Post = {
  message: string
  authorId?: string
  createdAt?: string
  updatedAt?: string
}

const postSchema = new mongoose.Schema<Post>({
  message: {
    type: String,
  },
  authorId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
  },
})

const User = mongoose.model('post', postSchema)

export default User
