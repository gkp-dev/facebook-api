import { Router } from 'express'
const router = Router()

router.post('/login', (req, res) => {
  res.json('Welcome to another api world')
})

router.post('/register', (req, res) => {
  res.json('Welcome to another api world')
})

export default router
