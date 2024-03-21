import { Router } from 'express'
import { handleLeagues, handleUnique } from './Controllers/leagues.service'

const LeaguesRouter = Router()

LeaguesRouter.get('/', handleLeagues)
LeaguesRouter.get('/unique/:id', handleUnique)

export default LeaguesRouter
