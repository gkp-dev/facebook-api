import { Router } from 'express'
const router = Router()

import { isEmpty } from 'lodash'

// Model
import User from '../../config/database/models/User'
import Post from '../../config/database/models/Post'
import Profile from '../../config/database/models/Profile'

router.get('/:id/posts', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (isEmpty(user)) {
      return res.status(400).json('user does not exist with this id')
    }

    //@ts-ignore
    const { posts } = user

    if (posts.length === 0) {
      return res.json('There is nothing there')
    }

    let allPosts = []
    for (let i = 0; i < posts.length; i++) {
      // @ts-ignore
      allPosts.push(await Post.findById(posts[i]))
    }

    return res.json(allPosts)
  } catch (err) {
    return res.json(err)
  }
})

router.get('/:id/profile', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (isEmpty(user)) {
      return res.status(404).json('user does not exist with this id')
    }

    //@ts-ignore
    const { profileId } = user
    if (!profileId) {
      return res.status(404).json('There is no profile yet')
    }

    const profile = await Profile.findById({ _id: profileId })

    if (isEmpty(profile)) {
      return res.json('There no profile yet')
    }

    return res.json(profile)
  } catch (err) {
    return res.status(500).json('Something went wrong')
  }
})

router.patch('/:id/profile', async (req, res) => {
  try {
    const { id } = req.params
    const { lastName, firstName } = req.body
    const user = await User.findById(id)

    if (isEmpty(user)) {
      return res.status(404).json('user does not exist')
    }

    //@ts-ignore
    const newProfile = await Profile.findByIdAndUpdate(
      { _id: user?.profileId },
      {
        $set: {
          firstName,
          lastName,
        },
      },
      { new: true }
    )

    return res.json(newProfile)
  } catch (err) {
    return res.status(500).json('Something went wrong')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    await User.findByIdAndRemove({ _id: id })
    await Profile.findByIdAndRemove(user?.profileId)

    res.json('Delete')
  } catch (err) {
    res.json(err)
  }
})

export default router
