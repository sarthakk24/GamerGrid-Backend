import { Request, Response, NextFunction } from 'express'
import { DBInstance } from '../../../loaders/database'

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
