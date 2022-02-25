import { Router } from 'express'
const router = Router()

// Routes
import authentication from './routes/authentication'
import posts from './routes/posts'
import users from './routes/users'

router.use('/v1/authentication', authentication)
router.use('/v1/posts', posts)
router.use('/v1/users', users)

router.get('/v1', (req, res) => {
  res.json('Welcome to another api world')
})

export default router
