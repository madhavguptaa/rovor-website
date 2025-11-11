import { MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient> | undefined

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

export function getMongoClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
  }

  return clientPromise!
}

export default getMongoClientPromise

