const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const MongoDb = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const Context = require('./src/db/strategies/base/contextStrategy')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {

    res.send('Hello World!')
})

app.post('/herois', async (req, res) => {
    const connection = MongoDb.connect()
    context = new Context(new MongoDb(connection, HeroSchema))
    const result = await context.create(req.body)
    res.json(result)
})

app.get('/herois', async (req, res) => {
    const connection = MongoDb.connect()
    context = new Context(new MongoDb(connection, HeroSchema))
    const result = await context.read()
    res.json(result)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})