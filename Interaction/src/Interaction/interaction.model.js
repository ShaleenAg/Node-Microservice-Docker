import mongoose from 'mongoose'
import getDB from '../db'

const { userDB, contentDB } = getDB()

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

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    phoneNumber: String,
    userID: {
      type: String,
      required: true,
      unique: true
    },
    likedStory: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
)
userSchema.index(
  {
    userID: 1,
    likedStory: 1
  },
  { unique: true }
)

export const User = userDB.model('users', userSchema, 'users')
export const Content = contentDB.model('contents', contentSchema, 'contents')
