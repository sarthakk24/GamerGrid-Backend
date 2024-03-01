import { Router } from 'express'
import { handleNews } from './Controllers/news.service'

const NewsRouter = Router()

NewsRouter.get('/', handleNews)

export default NewsRouter
