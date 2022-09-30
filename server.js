const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { JsonDB, Config } = require('node-json-db');
var cron = require('node-cron');


var db = new JsonDB(new Config("pagedb", true, true, '/'))



var counter = null


app.use(express.static('.'))
server.listen(80, () => {
    console.log('listening on 80')
})

cron.schedule('* * * * *', () => {
    socket.emit('counter', counter)
    console.log('updating counter')
})

io.on('connection', (socket) => {
    console.log(socket)
    console.log('a user connected');
    (async () => {
        counter = await db.getData('/counter/')
        db.push('/counter/', counter + 1)
        console.log(counter)
    })();





});


