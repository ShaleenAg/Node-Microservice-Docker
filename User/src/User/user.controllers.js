import { User } from './user.model'

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user.toJSON())
  } catch (e) {
    res.status(400).send(e)
  }
}

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .lean()
    .exec()
  if (!users) {
    res.status(404).send('No users found')
  } else {
    res.status(200).json(users)
  }
}

const updateName = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userID: req.body.userID },
      { firstName: req.body.firstName, lastName: req.body.lastName },
      { new: true, lean: true }
    ).exec()

    return res.status(200).json(user)
  } catch (e) {
    console.log('error is ')
    console.error(e)
    return res.status(404).send('User Not found')
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ userID: req.body.userID })
      .lean()
      .exec()

    return res.status(200).json(user)
  } catch (e) {
    console.log('error is ')
    console.error(e)
    return res.status(404).send('user not found')
  }
}
const getUser = async (req, res) => {
  const user = await User.findOne({ userID: req.params.userID })
    .lean()
    .exec()

  if (!user) {
    res.status(404).send('User not found')
  } else {
    res.status(200).json(user)
  }
}
const updateNumber = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userID: req.body.userID },
      { phoneNumber: req.body.phoneNumber },
      { new: true, lean: true }
    ).exec()

    return res.status(200).json(user)
  } catch (e) {
    console.log('error is ')
    console.error(e)
    return res.status(404).send('User Not found')
  }
}

const userControllers = {
  createUser,
  getAllUsers,
  getUser,
  updateName,
  deleteUser,
  updateNumber
}

export default userControllers
