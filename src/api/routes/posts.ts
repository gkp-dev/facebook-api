import { Router } from 'express'
const router = Router()

router.post('/', (req, res) => {
  res.json('Welcome to another api world')
})

router.get('/:id', (req, res) => {
  res.json('Welcome to another api world')
})

router.get('/', (req, res) => {
  res.json('Welcome to another api world')
})

router.patch('/:id', (req, res) => {
  res.json('Welcome to another api world')
})

router.delete('/:id', (req, res) => {
  res.json('Welcome to another api world')
})

export default router
