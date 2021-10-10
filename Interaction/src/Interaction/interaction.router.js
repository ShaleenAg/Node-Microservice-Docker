import { Router } from 'express'
import interactionControllers from './interaction.controller'

const interactionRouter = Router()

interactionRouter.route('/like').put(interactionControllers.addLikes)

interactionRouter.route('/read').put(interactionControllers.addReadCount)

export default interactionRouter
