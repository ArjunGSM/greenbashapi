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
        host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
        user: 'catellsuzmzqym',
        password: '7d03cfbca05d377f94d10126eac565c7fae45a24b9abb6d0b73f8de0c23a470a',
        database: 'ddl8roket54euk'
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
    const data = await db('gallery');
    res.status(200).json(data)
})

app.listen(3001, () => { console.log("Listening on port 3001") });