const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { JsonDB, Config } = require('node-json-db');
// var cron = require('node-cron');


var db = new JsonDB(new Config("pagedb", true, true, '/'))



var counter = null


app.use(express.static('.'))
server.listen(3000, () => {
    console.log('listening on 80')
})

// cron.schedule('* * * * *', () => {
//     socket.emit('counter', counter)
//     console.log('updating counter')
// })

io.on('connection', (socket) => {



    io.emit("join", socket.id)

    socket.on("disconnect", (reason) => {
        console.log(`user ${socket.id} disconnected`)
        io.emit("leave", socket.id)
        socket.removeAllListeners();
    })
    // console.log(socket)
    console.log(`user ${socket.id} connected`);
    // socket.broadcast.emit('counter', counter)
    // socket.emit("hello", 1, "2", { 3: Buffer.from([4])})
    // io.emit('counter', counter)
    // (async () => {
    //     counter = await db.getData('/counter/')
    //     db.push('/counter/', counter + 1)
    //     console.log(counter)
    // })();
    socket.on("connect_error", (error) => {
        console.log(`error due to ${error.message}`);
      });
      socket.on("error", (error) => {
        console.log(`error due to ${error.message}`);

    });

    


});



