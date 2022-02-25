import mongoose from 'mongoose'

type Post = {
  message: string
  authorId?: string
  createdAt?: string
  updatedAt?: string
}

type User = {
  email: string
  password: string
  profileId?: string
  posts: Post[]
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new mongoose.Schema<User>({
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
  profileId: {
    type: String,
  },
  posts: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
  },
})

const User = mongoose.model('user', userSchema)

export default User
