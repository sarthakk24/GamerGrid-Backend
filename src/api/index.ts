import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import ScraperRouter from './dataScripts/router'
import MatchesRouter from './matches/router'
import NewsRouter from './news/router'
import LeaguesRouter from './Leagues/router'
import TeamsRouter from './team/router'
import PlayersRouter from './players/routes'

export default (): Router => {
    const app = Router()
    app.use('/health', healthCheckRoute)
    app.use('/Scraper', ScraperRouter)
    app.use('/matches', MatchesRouter)
    app.use('/news', NewsRouter)
    app.use('/leagues', LeaguesRouter)
    app.use('/team', TeamsRouter)
    app.use('/player', PlayersRouter)
    return app
}
