import { Request, Response, NextFunction } from 'express'
import NewsApi from 'newsapi'

export const handleNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const newsApi = new NewsApi('cb5f304a2dc54b6d9b52088cfbbd5ef7')

    const headlines = await newsApi.v2.everything({
        q: 'Counter Strike PC Game',
        language: 'en',
        sources: 'bbc-news,the-verge',
        sortBy: 'relevancy',
        page: 1,
    })

    console.log(headlines)

    res.status(201).json({
        ...headlines,
        success: true,
    })
}
