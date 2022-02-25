import { Router } from 'express'
const router = Router()

router.get('/:id/posts', (req, res) => {
  res.json('Welcome to another api world')
})

router.get('/:id/profile', (req, res) => {
  res.json('Welcome to another api world')
})

router.patch('/:id/profile', (req, res) => {
  res.json('Welcome to another api world')
})

router.delete('/:id', (req, res) => {
  res.json('Welcome to another api world')
})

export default router
