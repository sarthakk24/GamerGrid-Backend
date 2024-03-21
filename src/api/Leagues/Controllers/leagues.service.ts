import { Request, Response, NextFunction } from 'express'
import { DBInstance } from '../../../loaders/database'
import { HLTV } from 'hltv'

export const handleLeagues = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const DB = await DBInstance.getInstance()
    const EventsCollection = await DB.getCollection('Events', 'GamerGridProd')

    const leagues = await EventsCollection.find({}).toArray()

    res.status(201).json({
        ...leagues,
        success: true,
    })
}

export const handleUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getEvent({ id: Number(req.params.id) })

    res.status(201).json({
        ...matches,
        success: true,
    })
}
