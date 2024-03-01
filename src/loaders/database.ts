import {
    Db,
    Collection,
    MongoClient,
    MongoError,
    ServerSession,
    ClientSession,
} from 'mongodb'
import config from '../config'
import Logger from './logger'

export class DBInstance {
    private static instance: DBInstance
    private static db: Db
    private static mongoClient: MongoClient

    private opts: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxIdleTimeMS: 5000,
    }

    private URL: string = config.dbURL
    private dbName: string = config.dbName
    private dbClient: MongoClient = new MongoClient(this.URL, this.opts)

    private constructor() {}
    private async initialize() {
        try {
            Logger.info('🔶 MongoDB Instance was Called first Time !!')
            DBInstance.mongoClient = await this.dbClient.connect()
            DBInstance.db = DBInstance.mongoClient.db(this.dbName)
            Logger.info(`✅ Connected to MongoDB: ${this.dbName}`)
        } catch (err) {
            console.error('❌ Could not connect to MongoDB\n%o', err)
            throw MongoError
        }
    }

    public static getInstance = async (): Promise<DBInstance> => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance()
            await DBInstance.instance.initialize()
        }
        return DBInstance.instance
    }

    public getSession = async (): Promise<ClientSession> => {
        try {
            return DBInstance.mongoClient.startSession()
        } catch (err) {
            console.error('❌ Could not start a session\n%o', err)
            throw MongoError
        }
    }

    public closeSession = async (session: ClientSession): Promise<void> => {
        try {
            await session.endSession()
        } catch (err) {
            console.error('❌ Could not close the session\n%o', err)
            throw MongoError
        }
    }

    public getCollection = async (
        CollName: string,
        DBName?: string
    ): Promise<Collection> => {
        try {
            DBInstance.db = DBInstance.mongoClient.db(DBName)
            return DBInstance.db.collection(CollName)
        } catch (err) {
            console.error('❌ Could not change the collection\n%o', err)
            throw MongoError
        }
    }
}
