import { Router } from 'express'
import { contentControllers } from './content.controllers'

const contentRouter = Router()

contentRouter.route('/get').get(contentControllers.getAllStories)

contentRouter.route('/get/:contentID').get(contentControllers.getStory)

contentRouter.route('/create').post(contentControllers.createStory)

contentRouter.route('/delete').delete(contentControllers.deleteStory)

contentRouter
  .route('/update/title/:contentID')
  .put(contentControllers.updateTitle)

contentRouter
  .route('/update/content/:contentID')
  .put(contentControllers.updateStoryContent)
export default contentRouter
