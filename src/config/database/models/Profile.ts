import mongoose from 'mongoose'

type Profile = {
  firstName: string
  lastName: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

const profilSchema = new mongoose.Schema<Profile>({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  userId: {
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

const User = mongoose.model('profil', profilSchema)

export default User
