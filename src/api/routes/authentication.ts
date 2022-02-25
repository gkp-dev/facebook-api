import { Router } from 'express'
const router = Router()

import { isEmpty } from 'lodash'

// Helpers
import { hashPassword, comparePassword } from '../../helpers/password'
import { generateToken } from '../../helpers/jwt'

// Model
import User from '../../config/database/models/User'

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (isEmpty(req.body)) {
      return res.status(400).json('Info Incomplete')
    }

    const [user] = await User.find({ email })
    if (!user) {
      return res.status(401).json('Email or password invalid')
    }

    //@ts-ignore
    if (!(await comparePassword(password, user.password))) {
      return res.status(401).json('Email or password invalid')
    }

    const token = generateToken({ email: user.email })

    return res.json({
      user,
      token: `Bearer ${token}`,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json('Something went wrong')
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  // 1- Validation des entrees
  if (isEmpty(req.body)) {
    return res.status(400).json('Information not complete')
  }

  try {
    const user = await User.find({ email })
    if (user.length > 0) {
      return res.status(400).json('User already exists')
    }

    // Register a User
    const newUser = await new User({
      email,
      password: await hashPassword(password),
      posts: [],
      profileId: '',
      updatedAt: '',
    }).save()

    res.json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).json('Something went wrong')
  }
})

export default router
