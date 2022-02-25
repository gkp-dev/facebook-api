import { Router } from 'express'
const router = Router()

import { isEmpty } from 'lodash'

// Helpers
import { hashPassword, comparePassword } from '../../helpers/password'
import { generateToken, decodedToken } from '../../helpers/jwt'

// Model
import User from '../../config/database/models/User'
import Profile from '../../config/database/models/Profile'

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (isEmpty(req.body)) {
      return res.status(404).json('Info Incomplete')
    }

    const users = await User.find({ email })
    if (users.length === 0) {
      return res.status(404).json('User does not exist')
    }

    let user = users[0]

    //@ts-ignore
    if (!(await comparePassword(password, user.password))) {
      return res.status(404).json('Email or password invalid')
    }

    return { user, token: `Bearer ${generateToken(user.email)}` }
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

router.post('/register', async (req, res) => {
  const { email, password, lastName, firstName } = req.body
  // 1- Validation des entrees
  if (isEmpty(req.body)) {
    return res.status(404).json('Information not complete')
  }

  try {
    const user = await User.find({ email })
    if (user.length > 0) {
      return res.status(404).json('User already exists')
    }

    // Register a User
    const newUser = await new User({
      email,
      password: await hashPassword(password),
      posts: [],
      updatedAt: '',
    }).save()

    const newProfile = await new Profile({
      firstName,
      lastName,
      userId: newUser._id,
      updatedAt: '',
    }).save()

    // Update  those two
    const otherUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: {
          profile: newProfile._id,
        },
      },
      { new: true }
    )

    await Profile.findByIdAndUpdate(newProfile._id, {
      $set: {
        userId: newProfile._id,
      },
    })

    res.json(otherUser)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

export default router
