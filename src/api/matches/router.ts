import { Router } from 'express'
import { handleActiveMatches, handleMatch } from './controllers/matches.service'

const MatchesRouter = Router()

MatchesRouter.get('/', handleActiveMatches)
MatchesRouter.get('/unique', handleMatch)

export default MatchesRouter
