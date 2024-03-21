import { Router } from 'express'
import {
    handleEvent,
    handleEvents,
    handleMatch,
    handleMatches,
    handleNews,
    handlePlayer,
    handleTeam,
    handleTeamStats,
} from './Controllers/matches.service'

const ScraperRouter = Router()

ScraperRouter.get('/match', handleMatch)
ScraperRouter.get('/player', handlePlayer)
ScraperRouter.get('/matches', handleMatches)
ScraperRouter.get('/events', handleEvents)
ScraperRouter.get('/event', handleEvent)
ScraperRouter.get('/news', handleNews)
ScraperRouter.get('/team', handleTeam)
ScraperRouter.get('/teamStats', handleTeamStats)

export default ScraperRouter
