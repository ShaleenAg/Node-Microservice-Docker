import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentID: {
    type: String,
    required: true,
    unique: true
  },
  likedUser: [{ type: String }],
  readUser: [{ type: String }],
  readCount: {
    type: Number,
    default: 0
  }
})
contentSchema.index(
  {
    contentID: 1,
    likedUser: 1
  },
  { unique: true }
)
contentSchema.index(
  {
    contentID: 1,
    readUser: 1
  },
  { unique: true }
)
export const Content = mongoose.model('Content', contentSchema)
