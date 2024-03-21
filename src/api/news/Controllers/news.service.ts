import { Request, Response, NextFunction } from 'express'
import { HLTV } from 'hltv'

export const handleNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const news = await HLTV.getNews()

    res.status(201).json({
        ...news,
        success: true,
    })
}
