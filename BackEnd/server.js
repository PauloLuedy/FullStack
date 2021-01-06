const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoDb = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const HeroiSchema = require('./src/db/strategies/postgres/schemas/heroiSchema')
const PostgresStrategy = require('./src/db/strategies/postgres/postgresSQLStrategy');
const Context = require('./src/db/strategies/base/contextStrategy')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
//mongodb
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

//postgress
app.post('/herois2', async (req, res) => {
    const connection = await PostgresStrategy.connect()
    const context = await PostgresStrategy.defineModel(connection, HeroiSchema)
    const result = await context.create(req.body)
    res.json(result)
})

app.get('/herois2', async (req, res) => {
    const all = { attributes: ['nome', 'poder', 'id'] };
    const connection = await PostgresStrategy.connect()
    const context = await PostgresStrategy.defineModel(connection, HeroiSchema)
    const result = await context.findAll(all)
    res.json(result)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})