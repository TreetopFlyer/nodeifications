require('dotenv').config();
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('web-push');
const path = require('path');

webPush.setVapidDetails(process.env.VAP_CON, process.env.VAP_PUB, process.env.VAP_PRI);

const app = express();
app.use(bodyParser.json());
app.use(express.static)
app.post('/', (req, res)=>{
    res.sendStatus(201);
    webPush.sendNotification(req.body, JSON.stringify({
        Title:'dat title'
    }));
});

console.log(process.env.KEY_PRI);