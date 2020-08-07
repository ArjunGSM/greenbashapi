const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


app.get('/navbardata', async (req, res) => {
    const data = await db('navbar')
    res.status(200).json({ engtitle: data[0].engtitle, arbtitle: data[0].arbtitle, logo: data[0].logo });
})

app.get('/homeslider', async (req, res) => {
    const data = await db('slider')
    res.status(200).json(data);
})

app.get('/homeorderonline', async (req, res) => {
    const data = await db('orderonline').orderBy('label');
    res.status(200).json(data);
})

app.get('/hometeam', async (req, res) => {
    const data = await db('team').orderBy('name')
    res.status(200).json(data)
})

app.get('/homegallery', async (req, res) => {
    const data = await db('gallery')
    res.status(200).json(data)
})

app.get('/locations', async (req, res) => {
    const data = await db('ourlocations')
    res.status(200).json(data)
})

app.listen(process.env.PORT, () => { console.log(`Listening on port ${process.env.PORT}`) });