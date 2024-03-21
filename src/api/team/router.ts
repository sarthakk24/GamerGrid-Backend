import { Router } from 'express'
import { handleTeam, handleTeamStats } from './controller/teams.service'

const TeamsRouter = Router()

TeamsRouter.get('/:id', handleTeam)
TeamsRouter.get('/stats/:id', handleTeamStats)

export default TeamsRouter
