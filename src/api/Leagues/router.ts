import { Router } from 'express'
import { handleLeagues } from './Controllers/leagues.service'

const LeaguesRouter = Router()

LeaguesRouter.get('/', handleLeagues)

export default LeaguesRouter
