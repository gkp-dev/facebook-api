import { isEmpty } from 'lodash'
import { Router } from 'express'
const router = Router()

// Model
import User from '../../config/database/models/User'
import Post from '../../config/database/models/Post'

router.post('/', async (req, res) => {
  const { message } = req.body
  // @ts-ignore
  const { user } = req

  const currentUser = await User.find({ email: user.email })

  if (isEmpty(currentUser)) {
    return res.status(404).json('There is something wrong')
  }

  try {
    const newPost = await new Post({
      message,
      //@ts-ignore
      authorId: currentUser[0]._id,
      updatedAt: '',
    }).save()

    await User.findByIdAndUpdate(
      //@ts-ignore
      { _id: currentUser[0]._id },
      {
        $push: { posts: newPost._id },
      }
    )

    res.json(newPost)
  } catch (err) {
    return res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (isEmpty(post)) {
      return res.status(404).json('There is no post')
    }

    return res.json(post)
  } catch (err) {
    return res.json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    if (posts.length === 0) {
      return res.status(404).json('There is no post')
    }

    return res.json(posts)
  } catch (err) {
    return res.json(err)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { message } = req.body
    const post = await Post.findById(id)
    if (isEmpty(post)) {
      return res.status(404).json('There is no post')
    }

    const newPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          message,
        },
      },
      { new: true }
    )

    return res.json(newPost)
  } catch (err) {
    return res.json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { message } = req.body

    await Post.findByIdAndRemove(id)

    return res.json(null)
  } catch (err) {
    return res.json(err)
  }
})

export default router
