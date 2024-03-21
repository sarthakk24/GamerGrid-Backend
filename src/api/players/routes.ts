import { Router } from 'express'
import { handlePlayer, handlePlayerStats } from './controller/players.service'

const PlayersRouter = Router()

PlayersRouter.get('/:id', handlePlayer)
PlayersRouter.get('/stats/:id', handlePlayerStats)

export default PlayersRouter
