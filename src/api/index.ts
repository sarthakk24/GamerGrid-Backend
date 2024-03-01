import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import ScraperRouter from './dataScripts/router'
import MatchesRouter from './matches/router'
import NewsRouter from './news/router'
import LeaguesRouter from './Leagues/router'

export default (): Router => {
    const app = Router()
    //TODO: add routes here...
    app.use('/health', healthCheckRoute)
    app.use('/Scraper', ScraperRouter)
    app.use('/matches', MatchesRouter)
    app.use('/news', NewsRouter)
    app.use('/leagues', LeaguesRouter)
    return app
}
