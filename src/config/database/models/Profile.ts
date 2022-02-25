import mongoose from 'mongoose'

const profilSchema = new mongoose.Schema({
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

const User = mongoose.model('profil', profilSchema)

export default User
