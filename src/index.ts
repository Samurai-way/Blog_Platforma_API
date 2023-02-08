import express from 'express'
import cors from 'express'
import {routes} from "./routes";

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json({}))


app.use('/api', routes)

const start = async () => {
    try {
        await runDb()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
