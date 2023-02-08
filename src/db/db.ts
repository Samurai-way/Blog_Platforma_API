import {MongoClient} from "mongodb";


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)

export const tunDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully')
    } catch {
        console.log('! Not to connect to server')
        await client.close()
    }
}