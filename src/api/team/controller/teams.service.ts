import { Request, Response, NextFunction } from 'express'
import { HLTV } from 'hltv'

export const handleTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const Team = await HLTV.getTeam({ id: Number(req.params.id) })

    const news = Team.news.slice(0, 10)
    delete Team.news
    res.status(201).json({
        ...Team,
        news,
        success: true,
    })
}

export const handleTeamStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const stats = await HLTV.getTeamStats({ id: Number(req.params.id) })

    const matches = stats.matches.slice(0, 20)
    const events = stats.events.slice(0, 20)

    delete stats.matches
    delete stats.events

    res.status(201).json({
        ...stats,
        matches,
        events,
        success: true,
    })
}
