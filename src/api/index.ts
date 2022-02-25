import { Router } from 'express'
const router = Router()

// Routes
import authentication from './routes/authentication'
import posts from './routes/posts'
import users from './routes/users'

router.use('/authentication', authentication)
router.use('/posts', posts)
router.use('/users', users)

router.get('/', (req, res) => {
  res.json('Welcome to another api world')
})

export default router
