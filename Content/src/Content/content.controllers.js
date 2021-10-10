import { Content } from './content.model'
import axios from 'axios'
const createStory = async (req, res) => {
  try {
    const story = await Content.create({
      title: req.body.title,
      content: req.body.content,
      contentID: req.body.contentID
    })

    return res.status(201).json(story.toJSON())
  } catch (e) {
    console.log('ERROR is')
    console.error(e)
    return res.status(400).send('Bad Request')
  }
}

const updateTitle = async (req, res) => {
  try {
    const newStory = await Content.findOneAndUpdate(
      { contentID: req.params.contentID },
      { title: req.body.title },
      { new: true, lean: true }
    ).exec()
    if (!newStory) {
      res.status(404).send('Story does not exist')
    } else {
      res.status(200).json(newStory)
    }
  } catch (e) {
    console.error(e)
    res.status(404).send('Story not found')
  }
}

const updateStoryContent = async (req, res) => {
  try {
    const newStory = await Content.findOneAndUpdate(
      { contentID: req.params.contentID },
      { content: req.body.content },
      { new: true, lean: true }
    ).exec()
    if (newStory) {
      return res.status(200).json(newStory)
    } else {
      return res.status(404).send('Story not found')
    }
  } catch (e) {
    console.log('error is')
    console.error(e)
    return res.status(404).send('Story not found')
  }
}

const getStory = async (req, res) => {
  const story = await Content.findOne({ contentID: req.params.contentID })
    .lean()
    .exec()

  if (!story) {
    res.status(404).send('story not found')
  } else {
    try {
      const ax = await axios.put('http://localhost:3000/interaction/read', {
        contentID: req.params.contentID
      })
      console.log('AXIOS!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(ax)
      res.status(200).json(ax.data)
    } catch (e) {
      console.log('Axios error')
      console.log(e)
      return res.status(404).send('Axios error')
    }
  }
}
const getAllStories = async (req, res) => {
  const story = await Content.find({})
    .lean()
    .exec()

  if (!story) {
    res.status(404).send('story not found')
  } else {
    res.status(200).json(story)
  }
}

const deleteStory = async (req, res) => {
  try {
    const story = await Content.deleteOne({ contentID: req.body.contentID })
      .lean()
      .exec()

    return res.status(200).json(story)
  } catch (e) {
    console.log('error is ')
    console.error(e)
    return res.status(404).send('user not found')
  }
}

export const contentControllers = {
  createStory,
  deleteStory,
  updateStoryContent,
  updateTitle,
  getAllStories,
  getStory
}
