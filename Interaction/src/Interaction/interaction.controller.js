import { User, Content } from './interaction.model'

const addReadCount = async (req, res) => {
  // check to see if request has userID, if true then add userID to readUser
  try {
    if (req.body.userID) {
      const user = await User.findOne({ userID: req.params.userID })
        .lean()
        .exec()
      if (user) {
        const story = await Content.findOneAndUpdate(
          { contentID: req.body.contentID },
          {
            $inc: { readCount: 1 },
            $push: { readUser: req.params.userID }
          },
          { new: true }
        )
          .lean()
          .exec()

        return res.status(200).json({ ...user, ...story })
      }
    }
  } catch (e) {
    console.error(e)
  }
  // no userID found in request, so only adding to readCount
  try {
    const story = await Content.findOneAndUpdate(
      { contentID: req.body.contentID },
      { $inc: { readCount: 1 } },
      { new: true }
    )
      .lean()
      .exec()

    return res.status(200).json(story)
  } catch (e) {
    console.log('interaction error')
    console.error(e)
    return res.status(404).send('Story not found')
  }
}

const addLikes = async (req, res) => {
  if (!req.body.contentID || !req.body.userID) {
    return res
      .status(404)
      .send('Please attach the userID/contentID in the request')
  }
  const user = await User.findOneAndUpdate(
    { userID: req.body.userID },
    {
      $push: {
        likedStory: req.body.contentID
      }
    },
    { new: true }
  )
    .lean()
    .exec()
  if (!user) {
    return res.status(400).send('User not found')
  }

  const story = await Content.findOneAndUpdate(
    { contentID: req.body.contentID },
    { $push: { likedUser: req.body.userID } },
    { new: true }
  )
    .lean()
    .exec()
  if (story) {
    res.status(200).json({ user, story })
  } else {
    res.status(400).send('Story not found')
  }
}

const interactionControllers = {
  addReadCount,
  addLikes
}
export default interactionControllers
