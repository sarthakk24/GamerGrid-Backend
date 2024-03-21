import { Request, Response, NextFunction } from 'express'
import HLTV from 'hltv'
import { DBInstance } from '../../../loaders/database'

export const handleMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getMatches()
    const DB = await DBInstance.getInstance()
    const ActiveMatchesCollection = await DB.getCollection(
        'ActiveMatches',
        'GamerGridProd'
    )

    const PassiveTeamsCollection = await DB.getCollection(
        'PassiveTeams',
        'GamerGridProd'
    )

    await ActiveMatchesCollection.deleteMany({})

    const configuredMatches = []

    for (const match of matches) {
        const output: any = { ...match }
        if (match.team1) {
            let team1Details = match.team1.id
                ? await PassiveTeamsCollection.findOne({
                      id: match.team1.id,
                  })
                : null

            if (!team1Details) {
                let team1Details = await HLTV.getTeam({
                    id: match.team1.id,
                })

                console.log(team1Details.name)

                delete team1Details.news
                delete team1Details.rankingDevelopment
                match.team1 = team1Details
                await PassiveTeamsCollection.insertOne(team1Details)
            }

            output.team1Details = team1Details
        }

        if (match.team2) {
            let team2Details = match.team2.id
                ? await PassiveTeamsCollection.findOne({
                      id: match.team2.id,
                  })
                : null

            if (!team2Details) {
                let team2Details = await HLTV.getTeam({
                    id: match.team2.id,
                })

                console.log(team2Details.name)
                delete team2Details.news
                delete team2Details.rankingDevelopment
                match.team2 = team2Details
                await PassiveTeamsCollection.insertOne(team2Details)
            }
            output.team2Details = team2Details
        }

        configuredMatches.push({
            ...output,
        })
    }

    await ActiveMatchesCollection.insertMany(configuredMatches)

    res.status(201).json({
        success: true,
    })
}

export const handleEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const events = await HLTV.getEvents()

    const DB = await DBInstance.getInstance()
    const EventsCollection = await DB.getCollection('Events', 'GamerGridProd')
    const PassiveTeamsCollection = await DB.getCollection(
        'PassiveTeams',
        'GamerGridProd'
    )
    await EventsCollection.deleteMany({})

    const configuredEvents = []
    for (const event of events) {
        const eventDetails = await HLTV.getEvent({ id: event.id })

        delete eventDetails.highlights
        delete eventDetails.news
        delete eventDetails.prizeDistribution
        delete eventDetails.relatedEvents

        const configuredEvent: any = { ...eventDetails }
        const teams = []
        for (const el of eventDetails.teams) {
            const teamDetails = await PassiveTeamsCollection.findOne(
                {
                    id: el.id,
                },
                { projection: { _id: 0, id: 1, name: 1, logo: 1 } }
            )

            if (!teamDetails) {
                console.log(`Document Fetch For ${el.id}`)

                let teamFetchDetails = await HLTV.getTeam({
                    id: el.id,
                })

                console.log(teamFetchDetails.name)

                delete teamFetchDetails.news
                delete teamFetchDetails.rankingDevelopment
                await PassiveTeamsCollection.insertOne(teamFetchDetails)

                const copyDoc = {
                    id: teamFetchDetails.id,
                    name: teamFetchDetails.name,
                    logo: teamFetchDetails.logo,
                }
                teams.push(copyDoc)
            } else {
                teams.push(teamDetails)
            }
        }
        configuredEvent.teams = teams
        configuredEvents.push(configuredEvent)
    }
    await EventsCollection.insertMany(configuredEvents)

    res.status(201).json({
        ...events,
        success: true,
    })
}

export const handleNews = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getNews()

    res.status(201).json({
        ...matches,
        success: true,
    })
}

export const handleTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getTeam({ id: 10831 })

    res.status(201).json({
        ...matches,
        success: true,
    })
}

export const handleEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getEvent({ id: 7260 })

    res.status(201).json({
        ...matches,
        success: true,
    })
}

export const handleTeamStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getTeamStats({ id: 12312 })

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
    const matches = await HLTV.getMatch({ id: 2370120 })

    res.status(201).json({
        ...matches,
        success: true,
    })
}

export const handlePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const matches = await HLTV.getPlayer({ id: 9115 })

    res.status(201).json({
        ...matches,
        success: true,
    })
}
