import { Request, Response, NextFunction } from 'express'
import { DBInstance } from '../../../loaders/database'
import HLTV from 'hltv'

export const handleActiveMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const DB = await DBInstance.getInstance()
    const ActiveMatchesCollection = await DB.getCollection(
        'ActiveMatches',
        'GamerGridProd'
    )

    const matches = await ActiveMatchesCollection.find({}).toArray()

    res.status(201).json({
        ...matches,
        success: true,
    })
}

export const handleMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matchDetails = await HLTV.getMatch({ id: Number(req.params.id) })

    delete matchDetails.vetoes
    delete matchDetails.highlights
    delete matchDetails.demos
    delete matchDetails.odds

    res.status(201).json({
        ...matchDetails,
        // ...matchStats,
        success: true,
    })
}

export const handleMap = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const mapDetails = await HLTV.getMatchMapStats({
        id: Number(req.params.id),
    })

    res.status(201).json({
        ...mapDetails,
        success: true,
    })
}
