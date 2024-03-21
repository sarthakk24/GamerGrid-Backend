import { Request, Response, NextFunction } from 'express'
import { HLTV } from 'hltv'

export const handlePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const player = await HLTV.getPlayer({ id: Number(req.params.id) })
    const news = player.news.slice(0, 10)

    delete player.news

    res.status(201).json({
        ...player,
        news,
        success: true,
    })
}

export const handlePlayerStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const player = await HLTV.getPlayerStats({ id: Number(req.params.id) })

    res.status(201).json({
        ...player,
        success: true,
    })
}
