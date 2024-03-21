import { Router } from 'express'
import {
    handleActiveMatches,
    handleMap,
    handleMatch,
} from './controllers/matches.service'

const MatchesRouter = Router()

MatchesRouter.get('/', handleActiveMatches)
MatchesRouter.get('/unique/:id', handleMatch)
MatchesRouter.get('/map/:id', handleMap)

export default MatchesRouter
