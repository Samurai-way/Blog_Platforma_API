import express from 'express'
import cors from 'express'
import {routes} from "./routes";

const app = express()
const port = 3000

app.use(cors())
app.use(express.json({}))


app.use('/api', routes)

const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
