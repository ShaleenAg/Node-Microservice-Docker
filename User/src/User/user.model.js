import mongoose from 'mongoose'
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
export const User = mongoose.model('User', userSchema)
