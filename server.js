require("dotenv").config();
const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

webPush.setVapidDetails("mailto:"+process.env.VAP_CON, process.env.VAP_PUB, process.env.VAP_PRI);

var Sub;
Sub = {};
Sub.Members = [];
Sub.Add = (inBody) =>
{
    var i;
    for(i=0; i<Sub.Members.length; i++)
    {
        if(Sub.Members[i].keys.auth == inBody.keys.auth)
        {
            return false;
        }
    }
    Sub.Members.push(inBody);
};
Sub.Broadcast = (inPayload)=>
{
    var i;
    for(i=0; i<Sub.Members.length; i++)
    {
        webPush.sendNotification(Sub.Members[i], JSON.stringify(inPayload));
    }
};

const server = express();
server.use(bodyParser.json());
server.use("/static", express.static(__dirname+"/static"));
server.use("/subscribe", (req, res)=>{
    console.log("subscription request received");
    Sub.Add(req.body);
    console.log(Sub.Members);
    res.sendStatus(201);
});
server.use("/push", (req, res)=>{
    console.log("broadcasting message");
    Sub.Broadcast({});
    res.sendStatus(201);
});

module.exports = server;