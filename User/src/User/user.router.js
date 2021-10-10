import { Router } from 'express'
import userControllers from './user.controllers'
const userRouter = Router()

userRouter.route('/create').post(userControllers.createUser)
userRouter.route('/update-name').put(userControllers.updateName)
userRouter.route('/delete').delete(userControllers.deleteUser)
userRouter.route('/get').get(userControllers.getAllUsers)
userRouter.route('/get/:userID').get(userControllers.getUser)
userRouter.route('/update-number').put(userControllers.updateNumber)
export default userRouter
